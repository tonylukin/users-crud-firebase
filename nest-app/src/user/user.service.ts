import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as admin from 'firebase-admin';
import axios from 'axios';
import { UserDto } from './user.dto';
import * as fs from 'fs';

const serviceAccount = JSON.parse(fs.readFileSync(__dirname + '/../../config/firebase.json', 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://rentredi-75864-default-rtdb.firebaseio.com',
});

@Injectable()
export class UserService {
  private readonly db = admin.database().ref('users');
  private readonly WEATHER_API_KEY = '7afa46f2e91768e7eeeb9001ce40de19';

  async createUser(createUserDto: UserDto) {
    const { name, zipCode } = createUserDto;

    let locationData = {};
    try {
      locationData = await this.fetchLocationData(zipCode);
    } catch (e) {
      console.error(e);
    }

    const newUser = {
      id: uuidv4(),
      name,
      zipCode,
      ...locationData,
    };

    await this.db.child(newUser.id).set(newUser);
    return { message: 'User created successfully', user: newUser };
  }

  async updateUser(id: string, updateUserDto: UserDto) {
    const { name, zipCode } = updateUserDto;
    const existingUser = (await this.db.child(id).get()).val();

    if (!existingUser) {
      throw new Error('User not found');
    }

    let locationData = {};
    try {
      if (zipCode !== existingUser.zipCode) {
        locationData = await this.fetchLocationData(zipCode);
      }
    } catch (e) {
      console.error(e);
    }

    const updatedUser = {
      ...existingUser,
      name,
      zipCode,
      ...locationData,
    };

    await this.db.child(id).set(updatedUser);
    return { message: 'User updated successfully', user: updatedUser };
  }

  async getUsers() {
    const snapshot = await this.db.get();
    return snapshot.val() || {};
  }

  async getUserById(id: string) {
    const snapshot = await this.db.child(id).get();
    return snapshot.exists() ? snapshot.val() : null;
  }

  async deleteUserById(id: string): Promise<boolean> {
    const snapshot = await this.db.child(id).get();
    if (!snapshot.exists()) {
      return false;
    }

    await this.db.child(id).remove();
    return true;
  }

  private async fetchLocationData(zipCode: string) {
    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},US&appid=${this.WEATHER_API_KEY}`;
    const response = await axios.get(url);

    const { coord, timezone } = response.data;
    return {
      latitude: coord.lat,
      longitude: coord.lon,
      timezone,
    };
  }
}

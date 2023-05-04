import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebcamService {
  constructor() { 

  }

  async checkCameraPermission(): Promise<boolean> {
    if (!navigator.permissions || !navigator.permissions.query) {
      // Permissions API not supported, assume permission was granted
      return true;
    }
    const permissionStatus = await navigator.permissions.query({ name: 'camera' as PermissionName });
    return permissionStatus.state === 'granted';
  }

  async requestCameraPermissions(): Promise<MediaStream> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log('Camera access granted');
      return stream;
    } catch (error) {
      console.error('Camera access denied', error);
      throw error;
    }
  }
}

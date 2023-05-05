import { Injectable } from '@angular/core';
declare const FB: any; // Declare the FB object

@Injectable({
  providedIn: 'root'
})
export class FacebookService {
  private readonly appId = '5047768345278522';
  private readonly apiVersion = 'v11.0';
  private readonly sdkInitialized: Promise<void>;

  constructor() {
    this.sdkInitialized = new Promise(resolve => {
      // Initialize the Facebook SDK with your app ID and API version
      window.fbAsyncInit = () => {
        FB.init({
          appId: this.appId,
          cookie: true,
          xfbml: true,
          version: this.apiVersion
        });
        resolve();
      };

      // Load the Facebook SDK asynchronously
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        var myJs = js as HTMLScriptElement;
        myJs.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode!.insertBefore(myJs, fjs);
      }(document, 'script', 'facebook-jssdk'));
    });
  }

  async getGroupMembers(groupId: string): Promise<any[]> {
    console.log('Initialize the Facebook SDK');
    // Wait for the Facebook SDK to be initialized
    await this.sdkInitialized;
    console.log('Querying the Facebook API for group members')
    // Make a request to the Facebook Graph API to retrieve the members of the group with the given ID
    const response = await FB.api(`/${groupId}/members`, { fields: 'id,name' } as any) as any;
    console.log('Response of query: ', response);
    // Return an array of the members' data
    return response.data;
  }
}

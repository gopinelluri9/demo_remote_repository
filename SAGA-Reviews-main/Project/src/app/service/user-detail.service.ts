import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserDetailService {
  constructor(private http: HttpClient) {
    if (localStorage.getItem("userpass") != null) {
      this.setUserDetails(JSON.parse(localStorage.getItem("userpass")));


    }
  }
  url: string = environment.currentServerURL + '/api/login';
  isLoggedIn: boolean;
  id: string = "";
  name: string = "";
  email: string = "";
  phoneNo: number;
  profilePicUrl: string = "";
  points: number = 0;
  level: string = "I";
  dob: string;
  country: string;
  subscribed: boolean;
  gender: string;
  resetKey: String = '';
  role: string;
  pointsUpdateUri: string = environment.currentServerURL + '/api/updatePoints';;

  setUserDetails(user) {

    this.isLoggedIn = true;
    this.id = user._id || "NA";
    this.name = user.name || "NA";
    this.email = user.email || "NA";
    this.profilePicUrl = user.profilePicUrl || "";
    this.subscribed = user.subscribed || false;
    this.phoneNo = user.phoneNo || 0;
    this.dob = user.dob || "NA";
    this.country = user.country || "NA";
    this.gender = user.gender || "NA";
    this.role = user.role || "user";
    this.points = user.points || 0;
  }
  logOutUser() {
    this.isLoggedIn = true;
    this.id = "NA";
    this.name = "NA";
    this.email = "NA";
    this.profilePicUrl = "";
    this.subscribed = false;
    this.phoneNo = 0;
    this.dob = "NA";
    this.country = "NA";
    this.gender = "NA";
    this.points = 0;
    this.level = "I";
    if (localStorage.getItem("userpass") != null) {
      localStorage.removeItem("userpass");
    }
  }
  setResetKey(key = '') {
    this.resetKey = key;
  }
}

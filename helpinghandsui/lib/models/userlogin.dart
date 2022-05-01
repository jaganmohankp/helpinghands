import 'dart:convert';

UserLogin userLoginFromJson(String str) => UserLogin.fromJson(json.decode(str));

String userLoginToJson(UserLogin data) => json.encode(data.toJson());

class UserLogin {
  UserLogin({
    required this.myresult,
    required this.email,
    required this.accessToken,
  });

  String myresult;
  String email;
  String accessToken;

  factory UserLogin.fromJson(Map<String, dynamic> json) => UserLogin(
    myresult: json['myresult'],
    email: json['email'],
    accessToken: json['accessToken'],
  );

  Map<String, dynamic> toJson() => {
    "myresult": myresult,
    "email": email,
    "accessToken": accessToken,
  };
}
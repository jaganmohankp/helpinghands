import 'package:helpinghandsui/models/appusers.dart';

import '../models/userregister.dart';
import 'package:http/http.dart' as http;

class LoginServices {

  Future<List<Appusers>?> getAppUsers() async{

    print(" remote api call init");
    var client = http.Client();
    var uri = Uri.parse('http://localhost:7000/apidb/dbuser');
    var response = await client.get(uri);
    if (response.statusCode == 200){
      var json = response.body;
      print("remote api call "+ json);
      return appusersFromJson(json);
    }
  }
}
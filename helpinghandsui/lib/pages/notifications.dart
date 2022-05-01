import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:snippet_coder_utils/hex_color.dart';

class Notifications extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          title:Text("Notifications")
      ),
      body: ListView.builder(
          itemCount: 5,
          itemBuilder: (BuildContext context,int index){
            return ListTile(
                leading: Image(
                  fit: BoxFit.fill,
                  alignment: Alignment.center,
                  image: AssetImage("assets/images/cookiecream.jpg"),
                ),
                trailing: Text("Unread",
                  style: TextStyle(
                      color: Colors.green,fontSize: 15),),
                title:Text("List item $index"),
                subtitle: Text("desc"),
              onTap: (){
                //db call
              },
            );
          }
      ),
    );
  }
}
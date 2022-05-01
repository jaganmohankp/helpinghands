import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:snippet_coder_utils/hex_color.dart';
class Notifications extends StatefulWidget {
  const Notifications({Key? key}) : super(key: key);

  @override
  State<Notifications> createState() => _NotificationsState();
}

class _NotificationsState extends State<Notifications> {

  List items = [
    {
      "item_id": 17,
      "itemname": "Shirt",
      "itemtype": "Requesting",
      "mcat": "HomeUtils",
      "scat": "Shirt",
      "description": "Shirt for men",
      "imagepath": "assets/images/cookiemint.jpg",
      "donorname": "NA",
      "recievername": "sara333",
      "itemaddress": "Rivervale Crescent rumbia lrt",
      "itemlocation": "rumbia",
      "itemphone": "9111111",
      "alluser": "sara111,sara123,sara222",
      "adminapproval": "Rejected"
    },
  ];


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          title:Text("Notifications"),
        centerTitle: true,
        backgroundColor: HexColor("283B71"),
      ),
      body: ListView.builder(
          itemCount: items.length,
          itemBuilder: (BuildContext context,int index){
            return Padding(
              padding: const EdgeInsets.all(1.0),
              child: ListTile(
                  leading: Image(
                    fit: BoxFit.fill,
                    alignment: Alignment.center,
                    image: AssetImage(items[index]["imagepath"]),
                  ),
                  trailing: items[index]["adminapproval"] == 'Rejected'?
                  Text(items[index]["adminapproval"],
                    style: TextStyle(
                        color: Colors.red,fontSize: 15),):
                  Text(items[index]["adminapproval"],
                  style: TextStyle(
                        color: Colors.green,fontSize: 15),),


                  title:Text(items[index]["itemname"]),
                  subtitle: Text(items[index]["recievername"]+' : '+ items[index]["itemtype"]),
                onTap: (){
                  //db call for read

                },
                //tileColor: Colors.red,
              ),
            );
          }
      ),
    );
  }
}
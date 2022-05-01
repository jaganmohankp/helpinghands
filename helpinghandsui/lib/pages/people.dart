import 'package:flutter/material.dart';
import 'package:helpinghandsui/pages/cookie_detail.dart';
import 'package:snippet_coder_utils/hex_color.dart';

class People extends StatelessWidget {


  List items = [
    {
      "itemName": "Books",
      "type": "offering",
      "imgPath": "assets/images/cookiemint.jpg",
      "Username": "Sara222",
      "location": "Rumbia"
    },
    {
      "itemName": "table",
      "type": "requesting",
      "imgPath": "assets/images/cookiecream.jpg",
      "Username": "Sara111",
      "location": "Rumbialrt"
    },
    {
      "itemName": "laptop",
      "type": "requesting",
      "imgPath": "assets/images/cookiecream.jpg",
      "Username": "Sara111",
      "location": "Rumbialrt"
    },
    {
      "itemName": "dress",
      "type": "requesting",
      "imgPath": "assets/images/cookiecream.jpg",
      "Username": "Sara111",
      "location": "Rumbialrt"
    },
    {
      "itemName": "tution",
      "type": "requesting",
      "imgPath": "assets/images/cookiecream.jpg",
      "Username": "Sara111",
      "location": "Rumbialrt"
    },
    {
      "itemName": "Dance",
      "type": "requesting",
      "imgPath": "assets/images/cookiecream.jpg",
      "Username": "Sara111",
      "location": "Rumbialrt"
    },
    {
      "itemName": "Dance",
      "type": "requesting",
      "imgPath": "assets/images/cookiecream.jpg",
      "Username": "Sara111",
      "location": "Rumbialrt"
    },
    {
      "itemName": "Dance",
      "type": "requesting",
      "imgPath": "assets/images/cookiecream.jpg",
      "Username": "Sara111",
      "location": "Rumbialrt"
    },
  ];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            title:Text("Request/Offer"),
          centerTitle: true,
          backgroundColor: HexColor("283B71"),
        ),
        backgroundColor: Color(0xFFFCFAF8),
        body: GridView.builder(
            itemCount: items.length,
            shrinkWrap: true,
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              crossAxisSpacing: 2,
              mainAxisSpacing: 2,
              mainAxisExtent: 225,


            ),
            itemBuilder: (context, index) => InkWell(
              onTap: () {
                Navigator.of(context).push(
                    MaterialPageRoute(builder: (context) => CookieDetail(
                        assetPath: items[index]["imgPath"],
                        cookieprice: items[index]["type"],
                        cookiename: items[index]["itemName"]
                    )));
              },
              child: Padding(
                padding: const EdgeInsets.fromLTRB(4,8,4,0),
                child: Container(
                  //height: 6000,
                    decoration: BoxDecoration(

                        borderRadius: BorderRadius.circular(15.0),
                        boxShadow: [
                          BoxShadow(
                              color: Colors.grey.withOpacity(0.2),
                              spreadRadius: 3.0,
                              blurRadius: 5.0)
                        ],
                        color: Colors.white),
                    child: Column(children: [
                      SizedBox(height: 7.0),
                      Text(items[index]["itemName"],
                          style: TextStyle(
                              color: HexColor("283B71"),
                              fontFamily: 'Varela',
                              fontWeight: FontWeight.bold,
                              fontSize: 16.0)),
                      SizedBox(height: 7.0),
                      Hero(
                          tag: items[index]["imgPath"],
                          child: Container(
                              height: 100.0,
                              width: 100.0,
                              decoration: BoxDecoration(
                                  image: DecorationImage(
                                      image: AssetImage(items[index]["imgPath"]),
                                      fit: BoxFit.contain)))),
                      SizedBox(height: 7.0),
                      Text(items[index]["type"],
                          style: TextStyle(
                              color: HexColor("283B71"),
                              fontFamily: 'Varela',
                              fontSize: 14.0)),

                      Padding(
                          padding: EdgeInsets.all(8.0),
                          child: Container(color: Color(0xFFEBEBEB), height: 1.0)),
                      Padding(
                        padding: EdgeInsets.only(left: 20.0),
                        child: Row(
                          children: [
                            Icon(Icons.person,
                                color: HexColor("283B71"), size: 10.0),
                            SizedBox(height: 7.0),
                            Text(items[index]["Username"],
                                style: TextStyle(
                                    fontFamily: 'Varela',
                                    fontSize: 11.0,
                                    fontWeight: FontWeight.bold,
                                    color: HexColor("#283B71"))),
                          ],
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.only(left: 20.0),
                        child: Row(
                          children: [
                            Icon(Icons.location_on,
                                color: HexColor("283B71"), size: 10.0),
                            SizedBox(height: 7.0),
                            Text(items[index]["location"],
                                style: TextStyle(
                                    fontFamily: 'Varela',
                                    fontSize: 11.0,
                                    fontWeight: FontWeight.bold,
                                    color: HexColor("#283B71"))),
                          ],
                        ),
                      ),
                    ])),
              ),
            )));
  }
}
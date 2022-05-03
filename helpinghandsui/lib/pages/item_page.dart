import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:helpinghandsui/pages/item_detail.dart';
import 'package:snippet_coder_utils/hex_color.dart';

class ItemPage extends StatelessWidget {
  List items = [
    {
      "item_id": 1,
      "itemname": "Shirt",
      "itemtype": "Requesting",
      "mcat": "Cloths",
      "scat": "Shirt",
      "description": "Shirt for men",
      "imagepath": "assets/images/cookiemint.jpg",
      "donorname": "NA",
      "recievername": "sara333",
      "itemaddress": "Rivervale Crescent rumbia lrt",
      "itemlocation": "rumbia",
      "itemphone": "9111111",
      "alluser": "sara111,sara123,sara222",
      "adminapproval": "pending"
    },
  ];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
                    MaterialPageRoute(builder: (context) => ItemDetail(
                      username:"username",
                      accessToken:"accessToken",
                      itemId: items[index].itemId,
                        imagepath: items[index].imagepath,
                        itemtype: items[index].itemtype,
                        itemname: items[index].itemname,
                        description: items[index].description,
                        donorname: items[index].donorname,
                        recievername: items[index].recievername,
                        itemphone: items[index].itemphone,
                        itemaddress: items[index].itemaddress,
                        itemlocation: items[index].itemlocation,
                        adminapproval: items[index].adminapproval,
                      alluser: items[index].allUser,

                    )));
              },
              child: Padding(
                padding: const EdgeInsets.fromLTRB(0,8,20,8),
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
                          tag: items[index]["itemId"],
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
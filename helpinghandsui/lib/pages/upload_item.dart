import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:snippet_coder_utils/hex_color.dart';

class uploaditem extends StatefulWidget {
  const uploaditem({Key? key}) : super(key: key);

  @override
  State<uploaditem> createState() => _uploaditemState();
}

class _uploaditemState extends State<uploaditem> {
  String dropdownvalue = 'Main Category';
  String sdropdownvalue = 'Sub Category';

  var items =  ['Main Category','Apple','Banana','Grapes','Orange','watermelon','Pineapple'];

  var subitems = ['Sub Category'];

  TextEditingController nameController = TextEditingController();
  TextEditingController _Textcontroller = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
        title: Text('Donation'),
          centerTitle: true,
          backgroundColor: HexColor("283B71"),
    ),
      body: SingleChildScrollView(
        child: Column(
            children: <Widget>[
            Padding(
            padding: EdgeInsets.fromLTRB(20,20,20,0),
            child: TextField(
              controller: nameController,
              decoration: InputDecoration(
                border: OutlineInputBorder(),
                labelText: 'Contact Name',
                ),
              ),
            ),
              Padding(
                padding: EdgeInsets.fromLTRB(20,20,20,0),
                child: Center(

                  child: Row(
                    children: [
                      DropdownButton(
                        value: dropdownvalue,

                        icon: Icon(Icons.keyboard_arrow_down),

                        items:items.map((String items) {
                          return DropdownMenuItem(
                              value: items,
                              child: Text(items,
                                overflow: TextOverflow.ellipsis,
                              )
                          );
                        }
                        ).toList(),
                        onChanged: (newValue){
                          setState(() {
                            dropdownvalue = newValue.toString();
                            print("inside drop down "+dropdownvalue);
                            if (dropdownvalue == 'Banana'){
                              subitems=['subbbb','subbdddddbb1','subbbb2'];
                              sdropdownvalue = 'subbbb';
                              print("inside sub drop down "+ subitems.first);
                            }
                            if (dropdownvalue == 'Apple'){
                              subitems = ['subapp','subapp1','subapp2'];
                              sdropdownvalue = 'subapp';
                              print("inside sub drop down "+ subitems.first);
                            }
                          });
                        },

                      ),
                      SizedBox(width: 100.0),
                      DropdownButton(
                        value: sdropdownvalue,

                        icon: Icon(Icons.keyboard_arrow_down),

                        items:subitems.map((String subitems) {
                          return DropdownMenuItem(
                              value: subitems,
                              child: Text(subitems,
                                overflow: TextOverflow.ellipsis,
                              )
                          );
                        }
                        ).toList(),
                        onChanged: (newValue){
                          setState(() {
                            sdropdownvalue = newValue.toString();

                          });
                        },

                      ),
                    ],
                  ),
                ),
              ),
              Padding(
                padding: EdgeInsets.fromLTRB(20,20,20,0),
                child: TextField(
                  controller: _Textcontroller,
                  keyboardType: TextInputType.multiline,
                  maxLines: 2,
                  decoration: InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Description',
                  ),

                ),
              ),
              Padding(
                padding: EdgeInsets.fromLTRB(20,20,20,0),
                child: TextField(
                  controller: nameController,
                  decoration: InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Phone',
                  ),
                ),
              ),
              Padding(
                padding: EdgeInsets.fromLTRB(20,20,20,0),
                child: TextField(
                  controller: _Textcontroller,
                  keyboardType: TextInputType.multiline,
                  maxLines: 2,
                  decoration: InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Address',
                  ),

                ),
              ),
              Padding(
                padding: EdgeInsets.fromLTRB(20,20,20,0),
                child: TextField(
                  controller: nameController,
                  decoration: InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'City/Landmark',
                  ),
                ),
              ),



              SizedBox(height: 20.0),
              Center(
                  child: Container(
                      width: MediaQuery.of(context).size.width - 50.0,
                      height: 50.0,
                      decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(25.0),
                          color: HexColor("#283B71")
                      ),
                      child: Center(
                          child: Text('Offer / Request',
                            style: TextStyle(
                                fontFamily: 'Varela',
                                fontSize: 18.0,
                                fontWeight: FontWeight.bold,
                                color: Colors.white
                            ),
                          )
                      )

                  )
              ),

            ]
    ),
      )
    );
  }
}

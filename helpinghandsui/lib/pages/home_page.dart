import 'package:flutter/material.dart';
import 'package:icon_badge/icon_badge.dart';
import 'package:helpinghandsui/navigation_drawer.dart';

import 'package:helpinghandsui/pages/cookie_page.dart';
import 'package:helpinghandsui/pages/home_page.dart';
import 'package:helpinghandsui/pages/notifications.dart';
import 'package:snippet_coder_utils/hex_color.dart';


class HomePage extends StatefulWidget {
  String myvar;
  HomePage({required this.myvar});
  late TabController _tabController;

  @override
  _HomePageState createState() => _HomePageState(myvar: myvar);
}

class _HomePageState extends State<HomePage> with SingleTickerProviderStateMixin  {
  String? myvar;
  _HomePageState({required this.myvar});
  late TabController _tabController;
  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        drawer: NavigationDrawer(token: "username"),
        appBar: AppBar(
          title: const Text('Helping Hands'),
          centerTitle: true,
         backgroundColor: HexColor("283B71"),
          //backgroundColor: Color(0xFFC88D67),
          actions: <Widget>[
            IconBadge(
              icon: Icon(Icons.notifications_none),
              itemCount: 100,
              badgeColor: Colors.red,
              itemColor: Colors.white,
              maxCount: 22,//unread count from DB
              hideZero: true,
              onTap: ()  {
                print("myuser mypass mycpass myemail");
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (context) => Notifications(),
                  ),
                );
                print("myuser mypass mycpass myemail");
              },
            ),

          ],
        ),
        body: ListView(
          padding: EdgeInsets.only(left: 20.0),
          children: <Widget>[
            SizedBox(height: 15.0),
            Text('Categories',
                style: TextStyle(
                    color: HexColor("283B71"),
                    fontFamily: 'Varela',
                    fontSize: 28.0,
                    fontWeight: FontWeight.bold)),
            SizedBox(height: 15.0),
            TabBar(
                controller: _tabController,
                indicatorColor: Colors.transparent,
                labelColor: HexColor("283B71"),
                isScrollable: true,
                labelPadding: EdgeInsets.only(right: 45.0),
                unselectedLabelColor: HexColor("283B71"),
                tabs: [
                  Tab(
                    child: Text('Education',
                        style: TextStyle(
                          fontFamily: 'Varela',
                          fontSize: 21.0,
                        )),
                  ),
                  Tab(
                    child: Text('Food',
                        style: TextStyle(
                          fontFamily: 'Varela',
                          fontSize: 21.0,
                        )),
                  ),
                  Tab(
                    child: Text('Home Utils',
                        style: TextStyle(
                          fontFamily: 'Varela',
                          fontSize: 21.0,
                        )),
                  ),
                  Tab(
                    child: Text('Clothes',
                        style: TextStyle(
                          fontFamily: 'Varela',
                          fontSize: 21.0,
                        )),
                  )
                ]),
            Container(
                height: MediaQuery.of(context).size.height - 50.0,
                width: double.infinity,
                child: TabBarView(
                    controller: _tabController,
                    children: [
                      CookiePage(),
                      CookiePage(),
                      CookiePage(),
                      CookiePage(),
                    ]
                )
            )
          ],
        ),


    );
  }
}
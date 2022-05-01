import 'package:flutter/material.dart';
import 'package:helpinghandsui/drawer_item.dart';
import 'package:helpinghandsui/pages/people.dart';
import 'package:snippet_coder_utils/hex_color.dart';
class NavigationDrawer extends StatefulWidget {
  String token;
  NavigationDrawer({required this.token});
  //const NavigationDrawer({Key? key}) : super(key: key);

  @override
  State<NavigationDrawer> createState() => _NavigationDrawerState(token: token);
}

class _NavigationDrawerState extends State<NavigationDrawer> {
  String? token;
  _NavigationDrawerState({required this.token});
  Widget build(BuildContext context) {
    return Drawer(
      child: Material(
        color: HexColor("283B71"),
        child: Padding(
          padding: const EdgeInsets.fromLTRB(24.0, 80, 24, 0),
          child: Column(
            children: [
              headerWidget(),
              const SizedBox(height: 30,),
              const Divider(thickness: 1, height: 10, color: Colors.white,),
              const SizedBox(height: 30,),

              DrawerItem(
                name: 'My Donations',
                icon: Icons.volunteer_activism,
                onPressed: ()=> onItemPressed(context, index: 0),
              ),
              const SizedBox(height: 30,),
              DrawerItem(
                  name: 'My Request',
                  icon: Icons.volunteer_activism,
                  onPressed: ()=> onItemPressed(context, index: 1)
              ),

              const SizedBox(height: 30,),

              const Divider(thickness: 1, height: 10, color: Colors.white,),
              const SizedBox(height: 30,),

              DrawerItem(
                  name: 'Log out',
                  icon: Icons.logout,
                  onPressed: ()=> onItemPressed(context, index: 2)
              ),

            ],
          ),
        ),
      ),
    );
  }

  void onItemPressed(BuildContext context, {required int index}){
    Navigator.pop(context);

    switch(index){
      case 0:
        Navigator.push(context, MaterialPageRoute(builder: (context) =>  People()));
        break;
      case 1:
        Navigator.push(context, MaterialPageRoute(builder: (context) =>  People()));
        break;
      case 2:
        Navigator.pushNamedAndRemoveUntil(
          context,
          '/login',
              (route) => false,
        );
        break;

    }
  }

  Widget headerWidget() {
    const url = 'https://media.istockphoto.com/photos/learn-to-love-yourself-first-picture-id1291208214?b=1&k=20&m=1291208214&s=170667a&w=0&h=sAq9SonSuefj3d4WKy4KzJvUiLERXge9VgZO-oqKUOo=';
    return Row(
      children: [
        const CircleAvatar(
          radius: 40,
          //backgroundImage: NetworkImage(url),
          backgroundImage:AssetImage('assets/images/'+'profile.jpg'),
        ),
        const SizedBox(width: 20,),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(token!, style: TextStyle(fontSize: 14, color: Colors.white)),
              SizedBox(height: 10,),
              const Text('username@email.com',
                    overflow: TextOverflow.ellipsis,
                  maxLines: 1,
                  softWrap: false,
                    style: TextStyle(fontSize: 14, color: Colors.white)),

            ],
          ),
        )
      ],
    );

  }
}




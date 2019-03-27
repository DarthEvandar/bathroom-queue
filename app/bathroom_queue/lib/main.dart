import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'dart:convert';
import './success.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Bathroom Queue',
      theme: ThemeData(
        primarySwatch: Colors.deepPurple,
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => MyHomePage(),
      },
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key}) : super(key: key);

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final TextEditingController _nameController = TextEditingController();
  Client client = Client();
  List<String> queue = List<String>();

  @override
  void initState() {
    _getQueue();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: Column(
            children: <Widget>[
              Padding(
                  padding: const EdgeInsets.all(60.0),
                  child: Center(
                    child: Text(
                      'Add to Queue',
                      style: Theme.of(context).textTheme.display1,
                    ),
                  )
              ),
              Padding(
                padding: const EdgeInsets.all(12.0),
                child: TextField(
                  controller: _nameController,
                  decoration: InputDecoration(
                    icon: const Icon(Icons.person, color: Colors.grey),
                    labelText: 'Name',
                    labelStyle: TextStyle(color: Colors.grey),
                    enabledBorder: OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.grey)
                    ),
                    focusedBorder: OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.purple[300])
                    ),
                  ),
                ),
              ),
              Padding(
                  padding: const EdgeInsets.only(top: 24.0, bottom: 12.0),
                  child: Center(
                    child: RaisedButton(
                      child: const Text('Add'),
                      onPressed: () => _add(),
                    ),
                  )
              ),
              Expanded(
                child: queue.isNotEmpty ? ListView.builder(
                  itemCount: queue.length,
                  itemBuilder: (BuildContext context, int index) =>
                    Center(
                      child: Text(queue[index], style: Theme.of(context).textTheme.display2),
                    )
                ): Container()
              )
            ],
          ),
        )
      ),
    );
  }

  Future<void> _getQueue() async {
    Response response = await client.get('https://gatekeeper.sundheim.online/bathroom/queue');
    print(response);
    setState(() {
      queue = List<String>.from(json.decode(response.body)['queue']);
      print(queue);
    });
  }

  void _add() async {
    Response response = await client.post(
        'https://gatekeeper.sundheim.online/bathroom/add/${_nameController.text}',
        headers: {'Content-Type': 'application/json'});
    print(json.decode(response.body)['success']);
    await _getQueue();
    Navigator.push(
        context, MaterialPageRoute<Success>(
        builder: (BuildContext context) => Success(queue))
    );
  }
}

import 'package:flutter/material.dart';

class Success extends StatelessWidget {
  final List<String> queue;

  Success(this.queue);

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
                        'Success',
                        style: Theme.of(context).textTheme.display1,
                      ),
                    )
                ),
                Expanded(
                  child: ListView.builder(
                    itemCount: queue.length,
                    itemBuilder: (BuildContext context, int index) =>
                      Center(
                        child: Text(queue[index], style: Theme.of(context).textTheme.display2,),
                      )
                  ),
                ),
              ],
            ),
          )
      ),
    );
  }
}

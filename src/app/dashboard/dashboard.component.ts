import { Component, OnInit } from '@angular/core';
import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import { Location } from '@angular/common';
import { fixNames } from 'src/app/_helpers/fix-names'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  authenticatedUser: any = {}
  decks = []
  mementos = []

  constructor(
    private location: Location) { }

  ngOnInit(): void {
    this.authenticatedUser = this.location.getState()
    console.log(this.authenticatedUser)
  }




getEvents = async (params) => {
  // Define event type from params
  const { contractAddress, contractName, eventName } = params;
  const eventType = `A.${contractAddress}.${contractName}.${eventName}`;

  const { from = 0, to } = params;
  let toBlock;
  if (to === undefined) {
    // Get latest block
    const blockResponse = await fcl.send(
      await fcl.build([fcl.getLatestBlock()])
    );
    toBlock = blockResponse.latestBlock.height;
  } else {
    toBlock = to;
  }

  const response = await fcl.send(
    await fcl.build([fcl.getEvents(eventType, from, toBlock)])
  );

  // Decode server response, so we could get properly formatted values
  const events = await fcl.decode(response);

  // Now let's purge prefixes from names
  const fixedEvents = events.map((item) => {
    const { data } = item;
    item.data = fixNames(data);
    return item;
  });

  // Return a list of events
  return fixedEvents;
};

}

import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

export interface CardMenuItem {
  title: string;
  actionVerb: string;
}

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit {
  @Input() title: string;
  @Input() menuItems: CardMenuItem[] = [];
  @Output() onMenuClicked = new EventEmitter<string>();
  @Input() createButtonTitle: string;
  @Output() onButtonClicked = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  hasMenuItems(): boolean {
    return this.menuItems.length > 0;
  }

  executeOnMenuClicked(verb: string): void {
    console.log("Guck mal hier: " + verb);
    this.onMenuClicked.next(verb);
  }

  executeOnButtonClicked($event: any): void {
    this.onButtonClicked.next($event);
  }
  hasCreateButton(): boolean {
    return this.createButtonTitle != null && this.createButtonTitle != "";
  }
}

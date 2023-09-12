import { Component, Inject ,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,  MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string[],
    private dialogRef: MatDialogRef<MessageComponent>
  ) { }

  errors: string[] = [];

  ngOnInit(): void {
    this.errors = this.data;
  }

  closed(){
    this.dialogRef.close();
  }

}

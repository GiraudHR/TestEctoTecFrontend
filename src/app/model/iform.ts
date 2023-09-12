import { FormControl } from "@angular/forms";

export interface IForm{
   name: FormControl<string> 
   email: FormControl<string>;
   phone: FormControl<string>;
   date: FormControl<string> 
   address: FormControl<string> ;
}

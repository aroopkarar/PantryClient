import { AbstractControl, ValidationErrors } from "@angular/forms";
import { DataManagerService } from "../services/data-manager.service";
import { Injectable } from "@angular/core";

@Injectable()
export class UsernameValidators{

    static dataManagerService: DataManagerService;
    constructor(private dataManagerService: DataManagerService)
    {
        UsernameValidators.dataManagerService=dataManagerService;
    }
    

    static cannotContainSpace(control: AbstractControl): ValidationErrors|null{
        if((control.value as string).indexOf(' ')>=0) 
        {
            return {cannotContainSpace: true};
        }
        return null;
    }

    shouldBeUnique(control: AbstractControl): Promise<ValidationErrors|null>
    {
        //let useridpresent: boolean = false;
        if(control.value!=null || control.value !=undefined || control.value !=''){
            UsernameValidators.dataManagerService.checkUserId(control.value).subscribe((res)=>{
                //if(res.json()==true)
                //useridpresent=true;
                return new Promise((resolve,reject)=>{
                    if(res.json()==true)
                        resolve({shoulBeUnique: true});
                    else
                        resolve(null);
                    }); 
            });
           
        } else
        return new Promise((resolve,reject)=>{resolve(null)});
        
           
    }
}
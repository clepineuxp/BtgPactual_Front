import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../../core/services/notification-service';

@Component({
  selector: 'app-send-transaction',
  templateUrl: './send-transaction.component.html',
  styleUrl: './send-transaction.component.scss'
})
export class SendTransactionComponent {
  public sendEmail:boolean = true;
    private _snackBar = inject(MatSnackBar);
  transactionId: string;
  fundName: string;
  form: FormGroup;

  constructor(
    private notificationService:NotificationService,
    public dialogRef: MatDialogRef<SendTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.transactionId = data.transactionId;
    this.fundName = data.fundName;
    this.form = this.fb.group({
      tel: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get tel() {
    return this.form.get('tel');
  }

  get email() {
    return this.form.get('email');
  }

  async send(){
    if(this.sendEmail && !this.email?.hasError('required') && !this.email?.hasError('email')){
      const response = await this.notificationService.sendNotifiactionEmail(this.transactionId, this.email?.value);
      if(response && 'message' in response){
        this._snackBar.open(response.message, 'cerrar',{
          duration: 3000
        });
        if(response.status == 200){
          this.dialogRef.close(true);
        }
      }
    }else if(!this.sendEmail && !this.tel?.hasError('required') && !this.tel?.hasError('pattern')){
      const response = await this.notificationService.sendNotifiactionSms(this.transactionId, this.tel?.value);
      if(response && 'message' in response){
        this._snackBar.open(response.message, 'cerrar',{
          duration: 3000
        });
        if(response.status == 200){
          this.dialogRef.close(true);
        }
      }
    }
  }


  closeModal(result: boolean) {
    this.dialogRef.close(result);
  }
}

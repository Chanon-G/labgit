import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser: any = [];

  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) {
    //let id = this.actRoute.snapshot.paramMap.get('id');
   // console.log("id  = "+id);
    this.authService.getdash().subscribe(res => {
      this.currentUser = res;
      console.log(res);
    })
  }

  ngOnInit() { }

}

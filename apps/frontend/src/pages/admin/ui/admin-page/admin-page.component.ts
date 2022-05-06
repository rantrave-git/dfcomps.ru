import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../../../app/configs/url-params.config';
import { UserInterface } from '../../../../app/interfaces/user.interface';
import { UserService } from '../../../../app/services/user-service/user.service';
import { AdminCurrentPageService } from '../../business/admin-current-page.service';

@Component({
  selector: 'admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPageComponent implements OnInit {
  public currentPage$: Observable<string>;
  public navigationPage$: Observable<string>;
  public user$: Observable<UserInterface>;
  public apiUrl: string;

  constructor(private adminCurrentPageService: AdminCurrentPageService, private userService: UserService) {}

  ngOnInit(): void {
    this.adminCurrentPageService.setRouteSubscription();
    this.currentPage$ = this.adminCurrentPageService.currentPage$;
    this.navigationPage$ = this.adminCurrentPageService.navigationPage$;
    this.user$ = this.userService.getCurrentUser$();
    this.apiUrl = API_URL;
  }

  ngOnDestroy(): void {
    this.adminCurrentPageService.unsetRouteSubscription();
  }
}

import { API_URL } from '~shared/rest-api';
import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CUSTOM_TABLE_NEWS_LIMIT } from '../../config/news.config';
import { map, Observable, take } from 'rxjs';
import { UserService } from '~shared/services/user-service/user.service';
import { NewsService } from '~shared/services/news-service/news.service';
import { UserAccess } from '~shared/enums/user-access.enum';
import { NewsOfflineResultsInterface } from '~shared/services/news-service/interfaces/news-offline-results.interface';
import { Physics } from '~shared/enums/physics.enum';
import { InvalidDemoInterface } from '~shared/interfaces/invalid-demo.interface';

@Component({
  selector: 'app-news-offline-results',
  templateUrl: './news-offline-results.component.html',
  styleUrls: ['./news-offline-results.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsOfflineResultsComponent implements OnInit, OnChanges {
  @Input() news: NewsOfflineResultsInterface;
  @Input() customTable = false;

  public physics = Physics;
  public maxDemosCount: number;
  public invalidDemos: InvalidDemoInterface[];
  public showDemosForValidationLink$: Observable<boolean>;

  constructor(
    private newsService: NewsService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.maxDemosCount = this.getMaxDemosCount();
    this.showDemosForValidationLink$ = this.userService.getCurrentUser$().pipe(
      take(1),
      map(
        (user) =>
          !!user &&
          (user.access === UserAccess.ADMIN || user.access === UserAccess.VALIDATOR) &&
          this.news.cup.demosValidated === '0',
      ),
    );
  }

  ngOnChanges({ news }: SimpleChanges): void {
    if (news && news.currentValue) {
      this.invalidDemos = [...this.news.cpmResults.invalid, ...this.news.vq3Results.invalid];
    }
  }

  public getValidationArchive(): void {
    this.newsService.getDemosForValidation$(this.news.cup.id).subscribe(({ url }) => window.open(url));
  }

  private getMaxDemosCount(): number {
    if (this.customTable) {
      return CUSTOM_TABLE_NEWS_LIMIT;
    }

    return this.news.cpmResults.valid.length > this.news.vq3Results.valid.length
      ? this.news.cpmResults.valid.length
      : this.news.vq3Results.valid.length;
  }
}

import { Component, Inject, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { formatResultTime } from '~shared/helpers/result-time.helper';
import { UploadedDemoInterface } from '~shared/interfaces/uploaded-demo.interface';
import { DemosService } from '~shared/services/demos/demos.service';
import { LanguageService } from '~shared/services/language/language.service';

@Component({
  selector: 'app-reflex-player-demos-dialog',
  templateUrl: './reflex-player-demos-dialog.component.html',
  styleUrls: ['./reflex-player-demos-dialog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReflexPlayerDemosDialogComponent {
  @Output()
  reloadNews = new EventEmitter<void>();

  public demos$ = new BehaviorSubject<UploadedDemoInterface[]>([]);
  public loading: Record<string, boolean>;

  constructor(
    public dialogRef: MatDialogRef<ReflexPlayerDemosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { demos: UploadedDemoInterface[]; cupName: string; cupId: string },
    private demosService: DemosService,
    private languageService: LanguageService,
  ) {
    this.demos$.next(this.data.demos);
  }

  public getFormattedTime(time: string): string {
    return formatResultTime(time);
  }

  public deleteDemo(demoName: string): void {
    this.languageService
      .getTranslation$('confirmDelete')
      .pipe(take(1))
      .subscribe((confirmDeleteCaption: string) => {
        if (!confirm(confirmDeleteCaption)) {
          return;
        }

        this.loading = {
          ...this.loading,
          [demoName]: true,
        };

        this.demosService.deleteDemo$(demoName, this.data.cupId).subscribe((demos: UploadedDemoInterface[]) => {
          this.demos$.next(demos);
          this.reloadNews.emit();
        });
      });
  }

  public isLoading(demoName: string): boolean {
    return !!this.loading && !!this.loading[demoName];
  }
}

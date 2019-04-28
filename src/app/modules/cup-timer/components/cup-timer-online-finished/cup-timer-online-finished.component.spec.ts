import { TestBed, async, fakeAsync } from '@angular/core/testing';
import { CupTimerOnlineFinishedComponent } from './cup-timer-online-finished.component';

describe('CupTimerOnlineFinishedComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CupTimerOnlineFinishedComponent],
        }).compileComponents();
    }));

    it('should create the app', fakeAsync(() => {
        const fixture = TestBed.createComponent(CupTimerOnlineFinishedComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});

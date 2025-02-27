import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { MulticupTableInterface } from '../../interfaces/multicup-table.interface';
import { MulticupResultInterface } from '../../interfaces/multicup-result.interface';
import { PlayerCellStyles } from '~shared/components/player-cell/enums/player-cell-styles.enum';
import { CupSystems } from '~shared/enums/cup-systems.enum';
import { Physics } from '~shared/enums/physics.enum';
import { getTablePlaces } from '~shared/helpers/table-places.helper';

@Component({
  selector: 'app-cup-full-table',
  templateUrl: './cup-full-table.component.html',
  styleUrls: ['./cup-full-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CupFullTableComponent implements OnChanges {
  @Input()
  fullTable: MulticupTableInterface;
  @Input()
  physics: Physics;
  @Output()
  navigateToRound = new EventEmitter<number>();

  public playerCellStyles = PlayerCellStyles;
  public cupSystems = CupSystems;
  public places: number[];
  public roundsCount: number;
  public range = (n: string) => new Array(+n).fill(null);

  ngOnChanges({ fullTable }: SimpleChanges): void {
    if (fullTable && fullTable.currentValue) {
      this.places = getTablePlaces(this.fullTable.players.map(({ overall }: MulticupResultInterface) => +overall));

      this.roundsCount = +this.fullTable.rounds + 1;
    }
  }

  getPlayerRoundResult(roundResult: string | null): string {
    if (roundResult === null) {
      return '-';
    }

    return roundResult;
  }
}

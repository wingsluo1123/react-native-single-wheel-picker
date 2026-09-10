/**
 * WheelPicker for HarmonyOS
 * Uses ArkUI TextPicker component
 */

import { RNOHContext, RNViewBase } from '@rnoh/react-native-openharmony';
import { WheelPicker as Spec } from '../generated/components/WheelPicker';

@Component
export struct WheelPicker {
  public static readonly NAME = Spec.NAME;
  public ctx!: RNOHContext;
  public tag: number = 0;

  @State private data: string[] = [];
  @State private isCyclic: boolean = false;
  @State private selectedItemTextColor: string = '';
  @State private selectedItemTextSize: number = 20;
  @State private selectedItemTextFontFamily: string = '';
  @State private indicatorWidth: number = 1;
  @State private hideIndicator: boolean = false;
  @State private indicatorColor: string = '';
  @State private itemTextColor: string = '';
  @State private itemTextSize: number = 16;
  @State private itemTextFontFamily: string = '';
  @State private initPosition: number = 0;
  @State private controlledPosition: number = 0;

  private eventEmitter: Spec.EventEmitter | undefined = undefined;
  private cleanUpCallbacks: (() => void)[] = [];
  private isInitialized: boolean = false;
  private changing: boolean = false;
  private selectedPosition: number = 0;
  private callbackTimer: number = -1;
  private lastSelectedItemProp: number | undefined = undefined;

  private normalizePosition(position: number, dataLength: number = this.data.length): number {
    if (dataLength === 0) {
      return 0;
    }
    return Math.max(0, Math.min(position, dataLength - 1));
  }

  private dataEquals(left: string[], right: string[]): boolean {
    if (left.length !== right.length) {
      return false;
    }
    return left.every((value, index) => value === right[index]);
  }

  private scheduleSelectionCallback(): void {
    if (this.changing) {
      return;
    }
    if (this.callbackTimer >= 0) {
      clearTimeout(this.callbackTimer);
    }
    this.callbackTimer = setTimeout(() => {
      if (this.eventEmitter) {
        this.eventEmitter.emit('change', { position: this.selectedPosition });
      }
      this.callbackTimer = -1;
    }, 250);
  }

  aboutToAppear(): void {
    this.eventEmitter = new Spec.EventEmitter(this.ctx.rnInstance, this.tag);

    this.cleanUpCallbacks.push(
      this.ctx.descriptorRegistry.subscribeToDescriptorChanges(
        this.tag,
        (descriptor) => {
          const rawProps = (descriptor as Spec.Descriptor).rawProps as Spec.DirectRawProps;
          if (rawProps) {
            // 处理 data 数组
            const nextData = rawProps.data && Array.isArray(rawProps.data)
              ? rawProps.data
              : [];
            if (!this.dataEquals(this.data, nextData)) {
              this.data = nextData;
            }

            this.isCyclic = rawProps.isCyclic ?? false;
            this.selectedItemTextColor = rawProps.selectedItemTextColor ?? '#000000';
            this.selectedItemTextSize = rawProps.selectedItemTextSize ?? 20;
            this.selectedItemTextFontFamily = rawProps.selectedItemTextFontFamily ?? '';
            this.indicatorWidth = rawProps.indicatorWidth ?? 1;
            this.hideIndicator = rawProps.hideIndicator ?? false;
            this.indicatorColor = rawProps.indicatorColor ?? '#000000';
            this.itemTextColor = rawProps.itemTextColor ?? '#808080';
            this.itemTextSize = rawProps.itemTextSize ?? 16;
            this.itemTextFontFamily = rawProps.itemTextFontFamily ?? '';

            // 处理初始位置和选中项
            const externalSelectedItem = rawProps.selectedItem;
            const externalPosition = externalSelectedItem ?? rawProps.initPosition;
            if (!this.isInitialized) {
              this.controlledPosition = this.normalizePosition(externalPosition ?? 0);
              this.selectedPosition = this.controlledPosition;
              this.lastSelectedItemProp = externalSelectedItem;
              this.isInitialized = true;
            } else if (externalSelectedItem !== undefined && externalSelectedItem !== null) {
              if (externalSelectedItem !== this.lastSelectedItemProp) {
                const normalizedPosition = this.normalizePosition(externalSelectedItem, nextData.length);
                if (normalizedPosition !== this.controlledPosition) {
                  this.controlledPosition = normalizedPosition;
                }
                this.selectedPosition = normalizedPosition;
                this.lastSelectedItemProp = externalSelectedItem;
              }
            }
          }
        }
      )
    );
  }

  aboutToDisappear(): void {
    if (this.callbackTimer >= 0) {
      clearTimeout(this.callbackTimer);
      this.callbackTimer = -1;
    }
    for (const cb of this.cleanUpCallbacks) {
      cb();
    }
  }

  build() {
    RNViewBase({ ctx: this.ctx, tag: this.tag }) {
      Column() {
        if (this.data.length > 0) {
          TextPicker({
            range: this.data
          })
            .selectedIndex(this.controlledPosition)
            .canLoop(this.isCyclic)
            .selectedTextStyle({
              color: this.selectedItemTextColor,
              font: {
                size: this.selectedItemTextSize,
                family: this.selectedItemTextFontFamily || undefined
              }
            })
            .textStyle({
              color: this.itemTextColor,
              font: {
                size: this.itemTextSize,
                family: this.itemTextFontFamily || undefined
              }
            })
            .divider(this.hideIndicator ? null : {
              strokeWidth: this.indicatorWidth,
              color: this.indicatorColor,
              startMargin: 0,
              endMargin: 0
            })
            .onChange((value: string | string[], index: number | number[]) => {
              const position = typeof index === 'number' ? index : (Array.isArray(index) ? index[0] : 0);
              const normalizedPosition = this.normalizePosition(position);
              if (normalizedPosition !== this.controlledPosition) {
                this.controlledPosition = normalizedPosition;
              }
              if (normalizedPosition === this.selectedPosition) {
                return;
              }
              this.selectedPosition = normalizedPosition;
              this.scheduleSelectionCallback();
            })
            .onTouch((event: TouchEvent) => {
              if (event.type === TouchType.Down) {
                this.changing = true;
                if (this.callbackTimer >= 0) {
                  clearTimeout(this.callbackTimer);
                }
              } else if (event.type === TouchType.Up) {
                this.changing = false;
                this.scheduleSelectionCallback();
              }
            })
            .width('100%')
            .height('100%')
        } else {
          Text('No data')
            .fontSize(14)
            .fontColor('#999999')
            .textAlign(TextAlign.Center)
            .width('100%')
            .height('100%')
        }
      }
      .width('100%')
      .height('100%')
      .justifyContent(FlexAlign.Center)
    }
  }
}

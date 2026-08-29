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
  @State private selectedItem: number = 0;
  @State private currentSelected: number = 0;

  private eventEmitter: Spec.EventEmitter | undefined = undefined;
  private cleanUpCallbacks: (() => void)[] = [];
  private isInitialized: boolean = false;

  aboutToAppear(): void {
    this.eventEmitter = new Spec.EventEmitter(this.ctx.rnInstance, this.tag);

    this.cleanUpCallbacks.push(
      this.ctx.descriptorRegistry.subscribeToDescriptorChanges(
        this.tag,
        (descriptor) => {
          const rawProps = (descriptor as Spec.Descriptor).rawProps as Spec.DirectRawProps;
          if (rawProps) {
            // 处理 data 数组
            if (rawProps.data && Array.isArray(rawProps.data)) {
              this.data = rawProps.data;
            } else {
              this.data = [];
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
            if (!this.isInitialized) {
              this.currentSelected = rawProps.selectedItem ?? rawProps.initPosition ?? 0;
              this.isInitialized = true;
            } else if (rawProps.selectedItem !== undefined && rawProps.selectedItem !== null) {
              this.currentSelected = rawProps.selectedItem;
            }
          }
        }
      )
    );
  }

  aboutToDisappear(): void {
    for (const cb of this.cleanUpCallbacks) {
      cb();
    }
  }

  build() {
    RNViewBase({ ctx: this.ctx, tag: this.tag }) {
      Column() {
        if (this.data.length > 0) {
          TextPicker({
            range: this.data,
            selected: this.currentSelected
          })
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
              if (position === this.currentSelected) {
                return;
              }

              this.currentSelected = position;
              if (this.eventEmitter) {
                this.eventEmitter.emit('change', { position: position });
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

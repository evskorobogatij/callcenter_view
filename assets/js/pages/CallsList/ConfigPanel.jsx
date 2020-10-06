import React, {forwardRef} from "react";
import {OverlayPanel} from "primereact/components/overlaypanel/OverlayPanel";
import {Checkbox} from "primereact/components/checkbox/Checkbox";

const ConfigPanel = forwardRef(({cols,handler},ref)=>(
    <OverlayPanel ref={ref} showCloseIcon dismissable >
        <div className="p-field-checkbox">
            <Checkbox inputId="isQueuename" name="isQueuename"  checked={cols.isQueuename} onChange={handler} />
            <label htmlFor="isQueuename">Очередь</label>
        </div>
        <div className="p-field-checkbox">
            <Checkbox inputId="isPos" name="isPos" checked={cols.isPos} onChange={handler} />
            <label htmlFor="isPos">Начальная позиция в очереди</label>
        </div>
        <div className="p-field-checkbox">
            <Checkbox inputId="isInputPhone" name="isInputPhone" checked={cols.isInputPhone} onChange={handler} />
            <label htmlFor="isInputPhone">Внутрений номер</label>
        </div>
    </OverlayPanel>
))

export default ConfigPanel;
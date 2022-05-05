import * as React from 'react';
import {
    RHFSelect,
} from '../../components/hook-form';
export interface IAppProps {
    data: string[],
    isEdit ?: boolean
}

export default function DetailsSelect({  data , isEdit }: IAppProps) {
    return (
        <div>
            <RHFSelect name="category" label={`Choose ${data[0].replace("-1"," ")}`} style={{ marginTop: "2rem" }} fullWidth disabled={isEdit}>
                {data.map((el, i) => (

                    <option key={i} value={el}>
                        {el}
                    </option>


                ))}
            </RHFSelect>
        </div>
    );
}

import * as React from 'react';
import {
    RHFSelect,
} from '../../components/hook-form';
export interface IAppProps {
    data: string[],
}

export default function DetailsSelect({  data }: IAppProps) {
    return (
        <div>
            <RHFSelect name="category" style={{ marginTop: "2rem" }} fullWidth>
                {data.map((el, i) => (

                    <option key={i} value={el}>
                        {el}
                    </option>


                ))}
            </RHFSelect>
        </div>
    );
}

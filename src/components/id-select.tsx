import { Raw } from "../types";
import { Select } from "antd";
//如果继承的类型和已有类型冲突就会寻找最大公约数
interface IdSelectProps extends Omit<SelectProps, 'options' | 'value' | 'onChange'>{
    value: Raw | null | undefined;
    onChange: (value?: number) => void;
    defaultOptionName?: string;
    options?: { name: string; id: number }[];
}
type SelectProps = React.ComponentProps<typeof Select>

export const IdSelet = (props: IdSelectProps) => {
    const { value, onChange, defaultOptionName, options, ...restProps} = props;
    return (
        <Select
            {...restProps}
            value={options?.length ? toNumber(value) : 0}
            onChange={(value) => onChange(toNumber(value) || undefined)}
        >
            {
                defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null
            }
            {
                options?.map(option => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)
            }
        </Select>
    );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));

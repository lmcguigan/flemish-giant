import styles from './Spinner.module.css'

interface Props {
    size?: number
}

export const Spinner = (props: Props) => {
    const size = props.size ?? 20
    return (
        <svg className={styles.spinner} role="alert" aria-live="assertive">
            <circle cx={size * 3/2} cy={size * 3/2} r={size} className={styles.circle} />
        </svg>
    )
}
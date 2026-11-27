export default function Text({ children, variant = 'p', ...props }) {
    const Tag = variant;
    return <Tag {...props}>{children}</Tag>;
}
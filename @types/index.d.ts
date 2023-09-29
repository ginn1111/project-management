declare global {
    interface ISidebarItem
        extends Omit<HTMLAttributes<HTMLButtonElement>, 'children'> {
        isMenuChild?: boolean;
        isActive: boolean;
        title: string;
        prefixIcon?: JSX.Element;
        childrenMenu?: any[];
        href?: string;
    }
}

export {};

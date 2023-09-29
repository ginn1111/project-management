import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconMenuDashboard from '@/components/Icon/Menu/IconMenuDashboard';
import Link from 'next/link';
import AnimateHeight from 'react-animate-height';

const SidebarItem = (props: ISidebarItem) => {
  const {
    isActive,
    title,
    isMenuChild,
    prefixIcon,
    childrenMenu,
    href,
    ...buttonProps
  } = props;

  if (childrenMenu?.length) {
    return (
      <li className="menu nav-item">
        <button
          type="button"
          className={`${isActive ? 'active' : ''} nav-link group w-full ${
            isMenuChild ? 'before:content-[""] before:!w-0' : ''
          }`}
          {...buttonProps}
        >
          <div className="flex items-center">
            {prefixIcon ?? (
              <IconMenuDashboard className="shrink-0 group-hover:!text-primary" />
            )}
            <span className="text-black pl-3 dark:text-[#506690] dark:group-hover:text-white-dark">
              {title}
            </span>
          </div>

          <div className={!isActive ? '-rotate-90' : ''}>
            <IconCaretDown />
          </div>
        </button>

        <AnimateHeight duration={300} height={isActive ? 'auto' : 0}>
          <ul className="sub-menu text-gray-500">
            {childrenMenu?.map((child) => {
              if (child?.children) {
                return <SidebarItem {...child} isMenuChild key={child.id} />;
              }

              return (
                <li key={child.id}>
                  <Link href={child?.href ?? '#'}>{child.title}</Link>
                </li>
              );
            })}
          </ul>
        </AnimateHeight>
      </li>
    );
  }

  return (
    <li>
      <Link href={href ?? '#'}>{title}</Link>
    </li>
  );
};

export default SidebarItem;

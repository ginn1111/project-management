import IconCalendar from '@/components/Icon/IconCalendar';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconChatNotification from '@/components/Icon/IconChatNotification';
import IconEdit from '@/components/Icon/IconEdit';
import IconLockDots from '@/components/Icon/IconLockDots';
import IconLogout from '@/components/Icon/IconLogout';
import IconMail from '@/components/Icon/IconMail';
import IconMenu from '@/components/Icon/IconMenu';
import IconSearch from '@/components/Icon/IconSearch';
import IconUser from '@/components/Icon/IconUser';
import IconXCircle from '@/components/Icon/IconXCircle';
import IconMenuDashboard from '@/components/Icon/Menu/IconMenuDashboard';
import IconMenuMore from '@/components/Icon/Menu/IconMenuMore';
import IconMenuPages from '@/components/Icon/Menu/IconMenuPages';
import { themeSelectors } from '@/store/selectors/theme-selectors';
import Link from 'next/link';
import React from 'react';
import Dropdown from './dropdown';
import IconMailDot from '@/components/Icon/IconMailDot';
import IconInfoCircle from '@/components/Icon/IconInfoCircle';
import IconBellBing from '@/components/Icon/IconBellBing';
import IconArrowLeft from '@/components/Icon/IconArrowLeft';
import IconMenuApps from '@/components/Icon/Menu/IconMenuApps';
import IconMenuComponents from '@/components/Icon/Menu/IconMenuComponents';
import IconMenuElements from '@/components/Icon/Menu/IconMenuElements';
import IconMenuDatatables from '@/components/Icon/Menu/IconMenuDatatables';
import IconMenuForms from '@/components/Icon/Menu/IconMenuForms';
function createMarkup(messages: any) {
  return { __html: messages };
}

const notifications = [
  {
    id: 1,
    profile: 'user-profile.jpeg',
    message:
      '<strong class="text-sm mr-1">John Doe</strong>invite you to <strong>Prototyping</strong>',
    time: '45 min ago',
  },
  {
    id: 2,
    profile: 'profile-34.jpeg',
    message:
      '<strong class="text-sm mr-1">Adam Nolan</strong>mentioned you to <strong>UX Basics</strong>',
    time: '9h Ago',
  },
  {
    id: 3,
    profile: 'profile-16.jpeg',
    message: '<strong class="text-sm mr-1">Anna Morgan</strong>Upload a file',
    time: '9h Ago',
  },
];

const messages = [
  {
    id: 1,
    image:
      '<span class="grid place-content-center w-9 h-9 rounded-full bg-success-light dark:bg-success text-success dark:text-success-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span>',
    title: 'Congratulations!',
    message: 'Your OS has been updated.',
    time: '1hr',
  },
  {
    id: 2,
    image:
      '<span class="grid place-content-center w-9 h-9 rounded-full bg-info-light dark:bg-info text-info dark:text-info-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></span>',
    title: 'Did you know?',
    message: 'You can switch between artboards.',
    time: '2hr',
  },
  {
    id: 3,
    image:
      '<span class="grid place-content-center w-9 h-9 rounded-full bg-danger-light dark:bg-danger text-danger dark:text-danger-light"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>',
    title: 'Something went wrong!',
    message: 'Send Reposrt',
    time: '2days',
  },
  {
    id: 4,
    image:
      '<span class="grid place-content-center w-9 h-9 rounded-full bg-warning-light dark:bg-warning text-warning dark:text-warning-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">    <circle cx="12" cy="12" r="10"></circle>    <line x1="12" y1="8" x2="12" y2="12"></line>    <line x1="12" y1="16" x2="12.01" y2="16"></line></svg></span>',
    title: 'Warning',
    message: 'Your password strength is low.',
    time: '5days',
  },
];

const Header = () => {
  const toggleSidebar = themeSelectors.use.toggleSidebar();
  return (
    <header className="z-40">
      <div className="shadow-sm">
        <div className="relative flex w-full items-center bg-white px-5 py-2.5 dark:bg-black">
          <div className="horizontal-logo flex items-center justify-between ltr:mr-2 rtl:ml-2 lg:hidden">
            <button
              type="button"
              className="collapse-icon flex flex-none rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary ltr:ml-2 rtl:mr-2 dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-primary lg:hidden"
              onClick={() => toggleSidebar()}
            >
              <IconMenu className="h-5 w-5" />
            </button>
          </div>
          <div className="flex justify-end items-center space-x-1.5 ltr:ml-auto rtl:mr-auto rtl:space-x-reverse dark:text-[#d0d2d6] sm:flex-1 ltr:sm:ml-0 sm:rtl:mr-0 lg:space-x-2">
            <div className="sm:ltr:mr-auto sm:rtl:ml-auto"></div>
            <div className="dropdown shrink-0">
              <Dropdown
                offset={[0, 8]}
                btnClassName="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                button={<IconMailDot />}
              >
                <ul className="w-[300px] !py-0 text-xs text-dark dark:text-white-dark sm:w-[375px]">
                  <li className="mb-5" onClick={(e) => e.stopPropagation()}>
                    <div className="relative !h-[68px] w-full overflow-hidden rounded-t-md p-5 text-white hover:!bg-transparent">
                      <div className="bg- absolute inset-0 h-full w-full bg-[url(/assets/images/menu-heade.jpg)] bg-cover bg-center bg-no-repeat"></div>
                      <h4 className="relative z-10 text-lg font-semibold">
                        Messages
                      </h4>
                    </div>
                  </li>
                  {messages.length > 0 ? (
                    <>
                      <li onClick={(e) => e.stopPropagation()}>
                        {messages.map((message) => {
                          return (
                            <div
                              key={message.id}
                              className="flex items-center px-5 py-3"
                            >
                              <div
                                dangerouslySetInnerHTML={createMarkup(
                                  message.image
                                )}
                              ></div>
                              <span className="px-3 dark:text-gray-500">
                                <div className="text-sm font-semibold dark:text-white-light/90">
                                  {message.title}
                                </div>
                                <div>{message.message}</div>
                              </span>
                              <span className="ml-auto mr-[0.5rem] whitespace-pre rounded bg-white-dark/20 px-1 font-semibold text-dark/60 ltr:ml-auto ltr:mr-2 rtl:ml-2 rtl:mr-auto dark:text-white-dark">
                                {message.time}
                              </span>
                              <button
                                type="button"
                                className="text-neutral-300 hover:text-danger"
                                // onClick={() => removeMessage(message.id)}
                              >
                                <IconXCircle />
                              </button>
                            </div>
                          );
                        })}
                      </li>
                      <li className="mt-5 border-t border-white-light text-center dark:border-white/10">
                        <button
                          type="button"
                          className="group !h-[48px] justify-center !py-4 font-semibold text-primary dark:text-gray-400"
                        >
                          <span className="group-hover:underline ltr:mr-1 rtl:ml-1">
                            VIEW ALL ACTIVITIES
                          </span>
                          <IconArrowLeft className="transition duration-300 group-hover:translate-x-1 ltr:ml-1 rtl:mr-1" />
                        </button>
                      </li>
                    </>
                  ) : (
                    <li className="mb-5" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        className="!grid min-h-[200px] place-content-center text-lg hover:!bg-transparent"
                      >
                        <div className="mx-auto mb-4 rounded-full text-white ring-4 ring-primary/30">
                          <IconInfoCircle fill={true} className="h-10 w-10" />
                        </div>
                        No data available.
                      </button>
                    </li>
                  )}
                </ul>
              </Dropdown>
            </div>
            <div className="dropdown shrink-0">
              <Dropdown
                offset={[0, 8]}
                btnClassName="relative block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                button={
                  <span>
                    <IconBellBing />
                    <span className="absolute top-0 flex h-3 w-3 ltr:right-0 rtl:left-0">
                      <span className="absolute -top-[3px] inline-flex h-full w-full animate-ping rounded-full bg-success/50 opacity-75 -left-[3px]"></span>
                      <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-success"></span>
                    </span>
                  </span>
                }
              >
                <ul className="w-[300px] divide-y !py-0 text-dark dark:divide-white/10 dark:text-white-dark sm:w-[350px]">
                  <li onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between px-4 py-2 font-semibold">
                      <h4 className="text-lg">Notification</h4>
                      {notifications.length ? (
                        <span className="badge bg-primary/80">
                          {notifications.length}New
                        </span>
                      ) : (
                        ''
                      )}
                    </div>
                  </li>
                  {notifications.length > 0 ? (
                    <>
                      {notifications.map((notification) => {
                        return (
                          <li
                            key={notification.id}
                            className="dark:text-white-light/90"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="group flex items-center px-4 py-2">
                              <div className="grid place-content-center rounded">
                                <div className="relative h-12 w-12">
                                  <img
                                    className="h-12 w-12 rounded-full object-cover"
                                    alt="profile"
                                    src={`/assets/images/${notification.profile}`}
                                  />
                                  <span className="absolute bottom-0 right-[6px] block h-2 w-2 rounded-full bg-success"></span>
                                </div>
                              </div>
                              <div className="flex flex-auto pl-3 rtl">
                                <div className="pr-3">
                                  <h6
                                    dangerouslySetInnerHTML={{
                                      __html: notification.message,
                                    }}
                                  ></h6>
                                  <span className="block text-xs font-normal dark:text-gray-500">
                                    {notification.time}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  className="text-neutral-300 opacity-0 hover:text-danger group-hover:opacity-100 ltr:ml-auto rtl:mr-auto"
                                >
                                  <IconXCircle />
                                </button>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                      <li>
                        <div className="p-4">
                          <button className="btn btn-primary btn-small block w-full">
                            Read All Notifications
                          </button>
                        </div>
                      </li>
                    </>
                  ) : (
                    <li onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        className="!grid min-h-[200px] place-content-center text-lg hover:!bg-transparent"
                      >
                        <div className="mx-auto mb-4 rounded-full ring-4 ring-primary/30">
                          <IconInfoCircle
                            fill={true}
                            className="h-10 w-10 text-primary"
                          />
                        </div>
                        No data available.
                      </button>
                    </li>
                  )}
                </ul>
              </Dropdown>
            </div>
            <div className="dropdown flex shrink-0">
              <Dropdown
                offset={[0, 8]}
                btnClassName="relative group block"
                button={
                  <img
                    className="h-9 w-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                    src="/assets/images/user-profile.jpeg"
                    alt="userProfile"
                  />
                }
              >
                <ul className="w-[230px] !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                  <li>
                    <div className="flex items-center px-4 py-4">
                      <img
                        className="h-10 w-10 rounded-md object-cover"
                        src="/assets/images/user-profile.jpeg"
                        alt="userProfile"
                      />
                      <div className="truncate pl-4">
                        <h4 className="text-base">
                          John Doe
                          <span className="rounded bg-success-light px-1 text-xs text-success ml-2">
                            Pro
                          </span>
                        </h4>
                        <button
                          type="button"
                          className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                        >
                          johndoe@gmail.com
                        </button>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link
                      href="/users/profile"
                      className="dark:hover:text-white"
                    >
                      <IconUser />
                      <span className="ml-2">Profile</span>
                    </Link>
                  </li>
                  <li className="border-t border-white-light dark:border-white-light/10">
                    <Link
                      href="/auth/boxed-signin"
                      className="!py-3 text-danger"
                    >
                      <IconLogout className="h-4.5 w-4.5 shrink-0 rotate-90 mr-2" />
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </Dropdown>
            </div>
          </div>
        </div>

        {/* horizontal menu */}
        <ul className="horizontal-menu hidden border-t border-[#ebedf2] bg-white px-6 py-1.5 font-semibold text-black rtl:space-x-reverse dark:border-[#191e3a] dark:bg-black dark:text-white-dark lg:space-x-1.5 xl:space-x-8">
          <li className="menu nav-item relative">
            <button type="button" className="nav-link">
              <div className="flex items-center">
                <IconMenuDashboard className="shrink-0" />
                <span className="px-1">dashboard</span>
              </div>
              <div className="right_arrow">
                <IconCaretDown />
              </div>
            </button>
            <ul className="sub-menu">
              <li>
                <Link href="/">sales</Link>
              </li>
              <li>
                <Link href="/analytics">analytics</Link>
              </li>
              <li>
                <Link href="/finance">finance</Link>
              </li>
              <li>
                <Link href="/crypto">crypto</Link>
              </li>
            </ul>
          </li>
          <li className="menu nav-item relative">
            <button type="button" className="nav-link">
              <div className="flex items-center">
                <IconMenuApps className="shrink-0" />
                <span className="px-1">apps</span>
              </div>
              <div className="right_arrow">
                <IconCaretDown />
              </div>
            </button>
            <ul className="sub-menu">
              <li>
                <Link href="/apps/chat">chat</Link>
              </li>
              <li>
                <Link href="/apps/mailbox">mailbox</Link>
              </li>
              <li>
                <Link href="/apps/todolist">todo_list</Link>
              </li>
              <li>
                <Link href="/apps/notes">notes</Link>
              </li>
              <li>
                <Link href="/apps/scrumboard">scrumboard</Link>
              </li>
              <li>
                <Link href="/apps/contacts">contacts</Link>
              </li>
              <li className="relative">
                <button type="button">
                  invoice
                  <div className="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                    <IconCaretDown />
                  </div>
                </button>
                <ul className="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow ltr:left-[95%] rtl:right-[95%] dark:bg-[#1b2e4b] dark:text-white-dark">
                  <li>
                    <Link href="/apps/invoice/list">list</Link>
                  </li>
                  <li>
                    <Link href="/apps/invoice/preview">preview</Link>
                  </li>
                  <li>
                    <Link href="/apps/invoice/add">add</Link>
                  </li>
                  <li>
                    <Link href="/apps/invoice/edit">edit</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/apps/calendar">calendar</Link>
              </li>
            </ul>
          </li>
          <li className="menu nav-item relative">
            <button type="button" className="nav-link">
              <div className="flex items-center">
                <IconMenuComponents className="shrink-0" />
                <span className="px-1">components</span>
              </div>
              <div className="right_arrow">
                <IconCaretDown />
              </div>
            </button>
            <ul className="sub-menu">
              <li>
                <Link href="/components/tabs">tabs</Link>
              </li>
              <li>
                <Link href="/components/accordions">accordions</Link>
              </li>
              <li>
                <Link href="/components/modals">modals</Link>
              </li>
              <li>
                <Link href="/components/cards">cards</Link>
              </li>
              <li>
                <Link href="/components/carousel">carousel</Link>
              </li>
              <li>
                <Link href="/components/countdown">countdown</Link>
              </li>
              <li>
                <Link href="/components/counter">counter</Link>
              </li>
              <li>
                <Link href="/components/sweetalert">sweet_alerts</Link>
              </li>
              <li>
                <Link href="/components/timeline">timeline</Link>
              </li>
              <li>
                <Link href="/components/notifications">notifications</Link>
              </li>
              <li>
                <Link href="/components/media-object">media_object</Link>
              </li>
              <li>
                <Link href="/components/list-group">list_group</Link>
              </li>
              <li>
                <Link href="/components/pricing-table">pricing_tables</Link>
              </li>
              <li>
                <Link href="/components/lightbox">lightbox</Link>
              </li>
            </ul>
          </li>
          <li className="menu nav-item relative">
            <button type="button" className="nav-link">
              <div className="flex items-center">
                <IconMenuElements className="shrink-0" />
                <span className="px-1">elements</span>
              </div>
              <div className="right_arrow">
                <IconCaretDown />
              </div>
            </button>
            <ul className="sub-menu">
              <li>
                <Link href="/elements/alerts">alerts</Link>
              </li>
              <li>
                <Link href="/elements/avatar">avatar</Link>
              </li>
              <li>
                <Link href="/elements/badges">badges</Link>
              </li>
              <li>
                <Link href="/elements/breadcrumbs">breadcrumbs</Link>
              </li>
              <li>
                <Link href="/elements/buttons">buttons</Link>
              </li>
              <li>
                <Link href="/elements/buttons-group">button_groups</Link>
              </li>
              <li>
                <Link href="/elements/color-library">color_library</Link>
              </li>
              <li>
                <Link href="/elements/dropdown">dropdown</Link>
              </li>
              <li>
                <Link href="/elements/infobox">infobox</Link>
              </li>
              <li>
                <Link href="/elements/jumbotron">jumbotron</Link>
              </li>
              <li>
                <Link href="/elements/loader">loader</Link>
              </li>
              <li>
                <Link href="/elements/pagination">pagination</Link>
              </li>
              <li>
                <Link href="/elements/popovers">popovers</Link>
              </li>
              <li>
                <Link href="/elements/progress-bar">progress_bar</Link>
              </li>
              <li>
                <Link href="/elements/search">search</Link>
              </li>
              <li>
                <Link href="/elements/tooltips">tooltips</Link>
              </li>
              <li>
                <Link href="/elements/treeview">treeview</Link>
              </li>
              <li>
                <Link href="/elements/typography">typography</Link>
              </li>
            </ul>
          </li>
          <li className="menu nav-item relative">
            <button type="button" className="nav-link">
              <div className="flex items-center">
                <IconMenuDatatables className="shrink-0" />
                <span className="px-1">tables</span>
              </div>
              <div className="right_arrow">
                <IconCaretDown />
              </div>
            </button>
            <ul className="sub-menu">
              <li>
                <Link href="/tables">tables</Link>
              </li>
              <li className="relative">
                <button type="button">
                  datatables
                  <div className="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                    <IconCaretDown />
                  </div>
                </button>
                <ul className="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow ltr:left-[95%] rtl:right-[95%] dark:bg-[#1b2e4b] dark:text-white-dark">
                  <li>
                    <Link href="/datatables/basic">basic</Link>
                  </li>
                  <li>
                    <Link href="/datatables/advanced">advanced</Link>
                  </li>
                  <li>
                    <Link href="/datatables/skin">skin</Link>
                  </li>
                  <li>
                    <Link href="/datatables/order-sorting">order_sorting</Link>
                  </li>
                  <li>
                    <Link href="/datatables/multi-column">multi_column</Link>
                  </li>
                  <li>
                    <Link href="/datatables/multiple-tables">
                      multiple_tables
                    </Link>
                  </li>
                  <li>
                    <Link href="/datatables/alt-pagination">
                      alt_pagination
                    </Link>
                  </li>
                  <li>
                    <Link href="/datatables/checkbox">checkbox</Link>
                  </li>
                  <li>
                    <Link href="/datatables/range-search">range_search</Link>
                  </li>
                  <li>
                    <Link href="/datatables/export">export</Link>
                  </li>
                  <li>
                    <Link href="/datatables/column-chooser">
                      column_chooser
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="menu nav-item relative">
            <button type="button" className="nav-link">
              <div className="flex items-center">
                <IconMenuForms className="shrink-0" />
                <span className="px-1">forms</span>
              </div>
              <div className="right_arrow">
                <IconCaretDown />
              </div>
            </button>
            <ul className="sub-menu">
              <li>
                <Link href="/forms/basic">basic</Link>
              </li>
              <li>
                <Link href="/forms/input-group">input_group</Link>
              </li>
              <li>
                <Link href="/forms/layouts">layouts</Link>
              </li>
              <li>
                <Link href="/forms/validation">validation</Link>
              </li>
              <li>
                <Link href="/forms/input-mask">input_mask</Link>
              </li>
              <li>
                <Link href="/forms/select2">select2</Link>
              </li>
              <li>
                <Link href="/forms/touchspin">touchspin</Link>
              </li>
              <li>
                <Link href="/forms/checkbox-radio">checkbox_and_radio</Link>
              </li>
              <li>
                <Link href="/forms/switches">switches</Link>
              </li>
              <li>
                <Link href="/forms/wizards">wizards</Link>
              </li>
              <li>
                <Link href="/forms/file-upload">file_upload</Link>
              </li>
              <li>
                <Link href="/forms/quill-editor">quill_editor</Link>
              </li>
              <li>
                <Link href="/forms/markdown-editor">markdown_editor</Link>
              </li>
              <li>
                <Link href="/forms/date-picker">date_and_range_picker</Link>
              </li>
              <li>
                <Link href="/forms/clipboard">clipboard</Link>
              </li>
            </ul>
          </li>
          <li className="menu nav-item relative">
            <button type="button" className="nav-link">
              <div className="flex items-center">
                <IconMenuPages className="shrink-0" />
                <span className="px-1">pages</span>
              </div>
              <div className="right_arrow">
                <IconCaretDown />
              </div>
            </button>
            <ul className="sub-menu">
              <li className="relative">
                <button type="button">
                  users
                  <div className="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                    <IconCaretDown />
                  </div>
                </button>
                <ul className="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow ltr:left-[95%] rtl:right-[95%] dark:bg-[#1b2e4b] dark:text-white-dark">
                  <li>
                    <Link href="/users/profile">profile</Link>
                  </li>
                  <li>
                    <Link href="/users/user-account-settings">
                      account_settings
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/pages/knowledge-base">knowledge_base</Link>
              </li>
              <li>
                <Link href="/pages/contact-us-boxed" target="_blank">
                  contact_us_boxed
                </Link>
              </li>
              <li>
                <Link href="/pages/contact-us-cover" target="_blank">
                  contact_us_cover
                </Link>
              </li>
              <li>
                <Link href="/pages/faq">faq</Link>
              </li>
              <li>
                <Link href="/pages/coming-soon-boxed" target="_blank">
                  coming_soon_boxed
                </Link>
              </li>
              <li>
                <Link href="/pages/coming-soon-cover" target="_blank">
                  coming_soon_cover
                </Link>
              </li>
              <li>
                <Link href="/pages/maintenence" target="_blank">
                  maintenence
                </Link>
              </li>
              <li className="relative">
                <button type="button">
                  error
                  <div className="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                    <IconCaretDown />
                  </div>
                </button>
                <ul className="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow ltr:left-[95%] rtl:right-[95%] dark:bg-[#1b2e4b] dark:text-white-dark">
                  <li>
                    <Link href="/pages/error404" target="_blank">
                      404
                    </Link>
                  </li>
                  <li>
                    <Link href="/pages/error500" target="_blank">
                      500
                    </Link>
                  </li>
                  <li>
                    <Link href="/pages/error503" target="_blank">
                      503
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="relative">
                <button type="button">
                  login
                  <div className="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                    <IconCaretDown />
                  </div>
                </button>
                <ul className="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow ltr:left-[95%] rtl:right-[95%] dark:bg-[#1b2e4b] dark:text-white-dark">
                  <li>
                    <Link href="/auth/cover-login" target="_blank">
                      login_cover
                    </Link>
                  </li>
                  <li>
                    <Link href="/auth/boxed-signin" target="_blank">
                      login_boxed
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="relative">
                <button type="button">
                  register
                  <div className="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                    <IconCaretDown />
                  </div>
                </button>
                <ul className="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow ltr:left-[95%] rtl:right-[95%] dark:bg-[#1b2e4b] dark:text-white-dark">
                  <li>
                    <Link href="/auth/cover-register" target="_blank">
                      register_cover
                    </Link>
                  </li>
                  <li>
                    <Link href="/auth/boxed-signup" target="_blank">
                      register_boxed
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="relative">
                <button type="button">
                  password_recovery
                  <div className="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                    <IconCaretDown />
                  </div>
                </button>
                <ul className="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow ltr:left-[95%] rtl:right-[95%] dark:bg-[#1b2e4b] dark:text-white-dark">
                  <li>
                    <Link href="/auth/cover-password-reset" target="_blank">
                      recover_id_cover
                    </Link>
                  </li>
                  <li>
                    <Link href="/auth/boxed-password-reset" target="_blank">
                      recover_id_boxed
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="relative">
                <button type="button">
                  lockscreen
                  <div className="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                    <IconCaretDown />
                  </div>
                </button>
                <ul className="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow ltr:left-[95%] rtl:right-[95%] dark:bg-[#1b2e4b] dark:text-white-dark">
                  <li>
                    <Link href="/auth/cover-lockscreen" target="_blank">
                      unlock_cover
                    </Link>
                  </li>
                  <li>
                    <Link href="/auth/boxed-lockscreen" target="_blank">
                      unlock_boxed
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="menu nav-item relative">
            <button type="button" className="nav-link">
              <div className="flex items-center">
                <IconMenuMore className="shrink-0" />
                <span className="px-1">more</span>
              </div>
              <div className="right_arrow">
                <IconCaretDown />
              </div>
            </button>
            <ul className="sub-menu">
              <li>
                <Link href="/dragndrop">drag_and_drop</Link>
              </li>
              <li>
                <Link href="/charts">charts</Link>
              </li>
              <li>
                <Link href="/font-icons">font_icons</Link>
              </li>
              <li>
                <Link href="/widgets">widgets</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;

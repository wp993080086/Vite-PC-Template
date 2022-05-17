export interface IMenuList {
  title: string
  index: string
  icon?: string
  children?: Array<IMenuList>
}

export interface IMenu {
  isCollapse: boolean
  menu: Array<IMenuList>
}

import {
  Component,
  ViewChild,
  ViewChildren,
  QueryList,
  ChangeDetectorRef
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';

@Component({
  selector: 'app-nested',
  templateUrl: './nested.component.html',
  styleUrls: ['./nested.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class NestedComponent {
  @ViewChild('outerSort', { static: true })
  sort: MatSort = new MatSort;
  @ViewChildren('innerSort')
  innerSort!: QueryList<MatSort>;
  @ViewChildren('innerTables')
  innerTables!: QueryList<MatTable<Address>>;

  data: User[] = USERS;

  dataSource!: MatTableDataSource<User>;
  usersData: User[] = [];
  columnsToDisplay = ['name', 'email', 'phone'];
  innerDisplayedColumns = ['street', 'zipCode', 'city'];
  innerInnerDisplayedColumns = ['comment', 'commentStatus'];
  expandedElement!: User | null;
  expandedElements: any[] = [];

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    USERS.forEach(user => {
      if (
        user.addresses &&
        Array.isArray(user.addresses) &&
        user.addresses.length
      ) {
        this.usersData = [
          ...this.usersData,
          { ...user, addresses: new MatTableDataSource(user.addresses) }
        ];
      } else {
        this.usersData = [...this.usersData, user];
      }
    });
    this.dataSource = new MatTableDataSource(this.usersData);
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.innerTables.forEach(
      (table, index) =>
        ((table.dataSource as MatTableDataSource<
          Address
        >).filter = filterValue.trim().toLowerCase())
    );
  }

  toggleRow(element: User) {
    element.addresses &&
    (element.addresses as MatTableDataSource<Address>).data.length
      ? this.toggleElement(element)
      : null;
    this.cd.detectChanges();
    this.innerTables.forEach(
      (table, index) =>
        ((table.dataSource as MatTableDataSource<
          Address
        >).sort = this.innerSort.toArray()[index])
    );
  }

  isExpanded(row: User): string {
    const index = this.expandedElements.findIndex(x => x.name == row.name);
    if (index !== -1) {
      return 'expanded';
    }
    return 'collapsed';
  }

  toggleElement(row: User) {
    const index = this.expandedElements.findIndex(x => x.name == row.name);
    if (index === -1) {
      this.expandedElements.push(row);
    } else {
      this.expandedElements.splice(index, 1);
    }

    //console.log(this.expandedElements);
  }
}

export interface User {
  name: string;
  email: string;
  phone: string;
  addresses?: Address[] | MatTableDataSource<Address>;
}

export interface Comment{
  commenID: number;
  comment: string;
  commentStatus: string;
}

export interface Address {
  street: string;
  zipCode: string;
  city: string;
  comments?: Comment[] | MatTableDataSource<Comment>;
}

const USERS: User[] = [
  {
    name: 'Mason',
    email: 'mason@test.com',
    phone: '9864785214',
    addresses: [
      {
        street: 'Street 1',
        zipCode: '78542',
        city: 'Kansas'
      }
    ]
  },
];

/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */


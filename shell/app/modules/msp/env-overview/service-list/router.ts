// Copyright (c) 2021 Terminus, Inc.
//
// This program is free software: you can use, redistribute, and/or modify
// it under the terms of the GNU Affero General Public License, version 3
// or later ("AGPL"), as published by the Free Software Foundation.
//
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
// FITNESS FOR A PARTICULAR PURPOSE.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

import i18n from 'i18n';
import { ServiceNameSelect } from './pages/service-name-select';

const tabs = [
  { key: 'overview', name: i18n.t('backup:service') },
  { key: 'transaction', name: i18n.t('msp:transaction') },
  { key: 'anomaly', name: i18n.t('msp:exception') },
  { key: 'process', name: i18n.t('msp:process') },
];

const serviceAnalysisRoutes = [
  {
    path: 'overview',
    tabs,
    layout: { fullHeight: true },
    getComp: (cb: RouterGetComp) => cb(import('msp/env-overview/service-list/pages/overview')),
  },
  {
    path: 'transaction',
    tabs,
    layout: { fullHeight: true },
    routes: [
      {
        path: 'trace-detail/:traceId',
        layout: { fullHeight: true },
        getComp: (cb: RouterGetComp) => cb(import('msp/monitor/trace-insight/pages/trace-querier/trace-search-detail')),
      },
      {
        layout: { fullHeight: true },
        getComp: (cb: RouterGetComp) => cb(import('msp/env-overview/service-list/pages/transaction')),
      },
    ],
  },
  {
    path: 'anomaly',
    tabs,
    layout: { fullHeight: true },
    getComp: (cb: RouterGetComp) => cb(import('msp/env-overview/service-list/pages/anomaly')),
  },
  {
    path: 'process',
    tabs,
    layout: { fullHeight: true },
    getComp: (cb: RouterGetComp) => cb(import('msp/env-overview/service-list/pages/process')),
  },
  {
    layout: { fullHeight: true },
    getComp: (cb: RouterGetComp) => cb(import('msp/env-overview/service-list/pages/overview')),
  },
];

export default () => ({
  path: 'service-list',
  breadcrumbName: i18n.t('msp:service list'),
  routes: [
    {
      path: ':applicationId',
      routes: [
        {
          path: ':serviceId',
          routes: [
            {
              path: ':serviceName',
              breadcrumbName: i18n.t('msp:service analysis'),
              tabs,
              alwaysShowTabKey: 'overview',
              pageNameInfo: ServiceNameSelect,
              layout: { fullHeight: true },
              routes: serviceAnalysisRoutes,
            },
          ],
        },
      ],
    },
    {
      getComp: (cb: RouterGetComp) => cb(import('msp/env-overview/service-list/pages')),
    },
  ],
});

export function serviceAnalysisRouter() {
  return {
    path: 'service-analysis',
    breadcrumbName: i18n.t('msp:service analysis'),
    tabs,
    alwaysShowTabKey: 'overview',
    pageNameInfo: ServiceNameSelect,
    layout: { fullHeight: true },
    routes: serviceAnalysisRoutes,
  };
}

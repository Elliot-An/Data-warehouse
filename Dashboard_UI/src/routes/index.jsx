import React from 'react';
import Sale from "@/pages/Sale";
import Inventory from "@/pages/Inventory";
import { Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import DiseasePrediction from '@/pages/DiseasePrediction';
import TrainModel from '@/pages/TrainModel';

export const routes = [
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Sale/>
      },
      {
        path: 'inventory',
        element: <Inventory/>
      },
      {
        path: 'disease-prediction',
        element: <DiseasePrediction/>
      },
      {
        path: 'train-model',
        element: <TrainModel/>
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
]

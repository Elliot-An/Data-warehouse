# Retail Sales Data Warehouse & OLAP Analytics

A retail analytics project that models sales and inventory data in a SQL Server data warehouse and presents analytical views through an interactive React dashboard. The project explores how dimensional modeling and OLAP operations can help users analyze revenue, sales volume, and inventory-related data across time and store dimensions.

> **Project type:** Personal learning project  
> **Team size:** 2 contributors  
> **Data scale:** Approximately 100,000–1,000,000 sample records  
> **Primary technologies:** Microsoft SQL Server, SQL Server Integration Services (SSIS), Node.js, React, shadcn/ui

## Table of Contents

- [Project Overview](#project-overview)
- [Business Objectives](#business-objectives)
- [Architecture](#architecture)
- [Data Warehouse Design](#data-warehouse-design)
- [ETL and Data Mapping](#etl-and-data-mapping)
- [Analytics Dashboard](#analytics-dashboard)
- [OLAP Operations](#olap-operations)
- [My Contributions](#my-contributions)
- [Technology Stack](#technology-stack)
- [Repository Structure](#repository-structure)
- [Getting Started](#getting-started)
- [Current Scope and Notes](#current-scope-and-notes)

## Project Overview

This project demonstrates a dimensional data warehouse for a retail sales scenario. Sample sales and inventory data are modeled in SQL Server to support analytical reporting and multidimensional exploration through a dashboard.

The solution separates the analytical data model from the user-facing dashboard. The data warehouse uses a **Star Schema-style dimensional model** with two fact tables and five dimension tables. The dashboard provides interactive ways to inspect sales and inventory-related information at different levels of detail.

## Business Objectives

The project is designed to support analysis of:

- **Sales revenue** over time and across relevant business dimensions.
- **Sales quantity** to understand sales volume.
- **Inventory-related data** by time and store.
- **Retail operations** through aggregation and detailed exploration of analytical data.

These analyses are intended to help users investigate business performance and inform inventory replenishment and distribution decisions. The project is an educational prototype using sample data; no measured business impact or production deployment outcome is claimed.

## Architecture

At a high level, the project contains the following parts:

1. **Source database** — sample operational data stored in Microsoft SQL Server.
2. **ETL process** — SSIS is used by the project team to move and transform data from the source into the data warehouse.
3. **Data warehouse** — a SQL Server dimensional model designed for analytical queries.
4. **Backend/API** — a Node.js component exposes data for the dashboard.
5. **OLAP layer** — OLAP cubes/server components were created as part of the project; the specific OLAP product is not currently documented.
6. **Frontend dashboard** — a React application using shadcn/ui chart components to visualize analytical results and support OLAP-style exploration.

```text
Sample Source Database (SQL Server)
                |
                v
          ETL with SSIS
                |
                v
    Data Warehouse (SQL Server)
                |
                v
       OLAP Layer / Cubes
                |
                v
        Node.js Backend API
                |
                v
 React Dashboard (shadcn/ui charts)
```

The diagram shows the conceptual flow. The exact deployment topology and the specific OLAP server technology have not been documented.

## Data Warehouse Design

The data warehouse is modeled with two fact tables and five dimension tables.

### Fact Tables

| Table | Purpose | Measures / Key Data |
|---|---|---|
| `Fact_MatHangBanRa` | Stores sales-related facts at the model's defined level of detail. | `SoLuong`, `DoanhThu` |
| `Fact_Kho` | Stores inventory-related facts associated with products, stores, and time. | `MucDoTonKho` |

The exact business definition of `MucDoTonKho` should be confirmed from the implementation before interpreting it as actual on-hand stock, target stock, or a replenishment quantity.

### Dimension Tables

| Table | Analytical role | Example attributes |
|---|---|---|
| `Dim_ThoiGian` | Time-based analysis | `MaThoiGian`, `Ngay`, `Thang`, `Nam` |
| `Dim_MatHang` | Product analysis | `MaMatHang`, `MoTa`, `KichThuoc`, `TrongLuong`, `DonGia` |
| `Dim_KhachHang` | Customer analysis | `MaKhachHang`, `MaThanhPho`, `TenKhachHang`, `LoaiKhachHang` |
| `Dim_ThanhPho` | Geographic analysis | `MaThanhPho`, `DiaChiVanPhong`, `TenThanhPho`, `TenBang` |
| `Dim_CuaHang` | Store analysis | `MaCuaHang`, `MaThanhPho`, `SoDienThoai` |

### Dimensional Modeling Considerations

A key design task was deciding which business events should be represented by fact tables and which measures were needed to answer the reporting questions. This included considering the intended analytical grain and the dimensions available for slicing and aggregation.

The model includes multiple levels of dimensional analysis, including time and geography. The exact hierarchy definitions should be read alongside the implemented model and dashboard behavior.

## ETL and Data Mapping

The project uses **SQL Server Integration Services (SSIS)** for ETL. Source-to-target mapping was defined to align fields in the source SQL Server database with the target dimensional model.

The mapping and transformation details should be documented from the actual SSIS packages or project implementation. This README does not assume specific cleansing rules, incremental-loading strategies, scheduling, error-handling behavior, or slowly changing dimension techniques.

## Analytics Dashboard

The dashboard is built with **React** and uses **shadcn/ui chart components** to present analytical data.

The intended analysis includes:

- Revenue analysis.
- Sales quantity analysis.
- Inventory-related analysis by time and store.
- Interactive exploration of data at different levels of detail.

Screenshots can be added here to make the dashboard easier to evaluate:

<!-- Replace these placeholders with screenshots committed to the repository. -->
<!-- Example: ![Sales dashboard](docs/images/sales-dashboard.png) -->

## OLAP Operations

The dashboard supports the following OLAP operations:

- **Roll-up** — aggregate data to a higher level in a dimension hierarchy, such as moving from daily to monthly or yearly analysis.
- **Drill-down** — move from summarized data to a more detailed level.
- **Slice** — focus on a subset of data by fixing a dimension value.
- **Dice** — select a subcube by filtering multiple dimensions or dimension ranges.

These operations let users explore the available analytical data from different perspectives. The underlying OLAP server/product is not currently identified in this documentation.

## My Contributions

This was a two-person learning project. My responsibilities focused on dimensional modeling and the dashboard:

- Designed the Star Schema-style data warehouse model, including two fact tables and five dimension tables.
- Defined source-to-target data mapping between the source database and the target analytical model.
- Designed dimensional hierarchies to support multi-level analysis.
- Developed the React dashboard using shadcn/ui chart components.
- Implemented dashboard interactions for Roll-up, Drill-down, Slice, and Dice.

**Team responsibilities:** SSIS-based ETL implementation, data warehouse implementation, OLAP cube creation, and Node.js API development were handled by the other team member. These are included here to describe the overall project architecture, not as my individual contributions.

## Technology Stack

| Area | Technology |
|---|---|
| Source database | Microsoft SQL Server |
| Data warehouse | Microsoft SQL Server |
| ETL | SQL Server Integration Services (SSIS) |
| Backend/API | Node.js |
| Frontend | React |
| Chart/UI components | shadcn/ui chart components |
| OLAP server | Not currently identified |

## Repository Structure

The project is maintained in two separate repositories:

- **Frontend repository:** React dashboard and UI.
- **Backend / data warehouse repository:** Node.js API and data warehouse-related project assets.

Add the actual repository URLs here:

- Frontend: `TODO: add frontend repository URL`
- Backend / data warehouse: `TODO: add backend repository URL`

## Getting Started

The exact setup steps depend on the contents of the two repositories and the local SQL Server / SSIS configuration. The following details need to be filled in from the actual implementation before this section can be used as a runnable guide.

### Prerequisites

Confirm the required versions and setup for:

- Microsoft SQL Server.
- SQL Server Integration Services (SSIS) and any required development/runtime tools.
- Node.js and npm.
- The frontend package manager and required environment variables.
- The OLAP server/product, if it must be installed or configured separately.

### Setup Steps

1. Clone the frontend and backend / data warehouse repositories using their actual Git URLs.
2. Configure the source database and create or restore the sample source data.
3. Configure the SQL Server data warehouse according to the project's schema scripts.
4. Configure and execute the SSIS packages to load the data warehouse.
5. Configure the OLAP layer using the project's actual server and cube definitions.
6. Configure the Node.js API and its database / OLAP connection settings.
7. Install frontend dependencies and configure the API endpoint used by the React application.
8. Start the backend and frontend using the commands documented in their respective repositories.

> **Before publishing:** Replace this outline with verified commands, required environment variables, database setup scripts, and any cube deployment instructions. No run commands or configuration keys are included here because they have not yet been provided.

## Current Scope and Notes

- The project uses sample data, with an approximate scale of 100,000–1,000,000 records.
- No benchmark results, query latency measurements, or quantified business outcomes have been recorded.
- The exact definition of `Fact_Kho.MucDoTonKho` should be confirmed before making claims about actual inventory levels or replenishment calculations.
- The specific OLAP server/product and detailed deployment instructions remain to be documented.
- This project is intended to demonstrate data warehouse modeling and OLAP-oriented analytics in a learning context; it should not be interpreted as a claim of production deployment.

---

*This README describes the project based on currently confirmed information. Update the TODOs and implementation-specific details after verifying the repository contents.*

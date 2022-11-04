import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useLocation, useSearchParams } from "react-router-dom";
import useRedirect from "../../Core/Hooks/Redirect";
import { request } from "../../Core/Services/Request";
import { capitalize, url } from "../../Core/Utilities";
import CreateIcon from '@mui/icons-material/Create';
import { useDispatch } from "react-redux";
import { notification } from "../../Core/Services/Redux/AppAction";
import Tooltip from '@mui/material/Tooltip';
import TableActions from "./TableActions";

export default function AppDataTable({ columns = [], reloadTable = 1, api = "", filterComponent = "", moreActionButtons = "", otherQuery = {}, defaultSortFieldId = 0 }) {

    const [searchParams] = useSearchParams();
    const location = useLocation();
    const { redirectTo } = useRedirect();
    const dispatch = useDispatch();
    const [searchField, setSearchField] = useState("");
    const [dataTableData, setDataTableData] = useState({
        limit: 20,
        page: 1,
        sort: "",
    })
    const [data, setData] = useState({
        header: columns.length > 0 ? columns : [],
        data: {
            data: [],
            totalData: 0
        }
    })

    useEffect(() => {
        // if(Object.keys(otherQuery).length !== 0)
        // setDataTableData(p => ({...p, ...otherQuery}))
    }, [])

    const generateQuery = (params) => {
        let key = Object.keys(params);
        key = [...new Set(key)]
        let query = "";
        for (let i = 0; i < key.length; i++) {
            const element = key[i];
            query += `${element}=${params[element]}&`
        }
    
        return query.replace(/&\s*$/, "");
    }

    const fetchTable = useCallback((params) => {
        let tableParams = {...dataTableData, search: searchField, ...otherQuery}
        let query = generateQuery(tableParams);
        dispatch(notification('Loading...', true))
        api = api + '?' + query;
        request(url(api ?? `/sections/table/data?${query}`))
        .then(res => {
            setData(p => ({...p, data: {
                data: res.result.data,
                total: +res.result.total
            }}))
            dispatch(notification('Loading...', false))
        })
        .catch(error => {
            console.log(error);
        })
    }, [module, dataTableData, dispatch, searchField, api, reloadTable, otherQuery])

    const fetchHeaders = useCallback((params) => {
        if(! api)
        request(url('/sections/table/header?key=' + module))
        .then(res => {
            setData(p => ({...p, header: resetHeader(res.result)}))
        })
        .catch(error => {
            console.log(error);
        })
    }, [module, api]);

    useEffect(() => {
        if(! columns.length > 0)
        fetchHeaders();
    }, [fetchHeaders, columns.length])

    useEffect(() => {
        fetchTable();
    }, [fetchTable, reloadTable])


    const resetHeader = (header) => {
        let reHeader = [];
        header = [...header, {name: "Actions", key: "actions", id: "data-table-action"}]
        for (let i = 0; i < header.length; i++) {
            const element = header[i];
            let headerSet = {
                name: element.name,
                selector: row => row[element.key] ? <Tooltip title={row[element.key]} placement="top"><div>{row[element.key]}</div></Tooltip>: '---',
                sortable: true,
                sortKeyValue: element.key,
                id: element.id ?? Math.random(1111,9999) + Math.random(6335462, 99999999999),
                fixed: true
            }
            if(header.length ===  (i + 1)) {
                headerSet["width"] = "100px";
                headerSet["center"] = true;
                headerSet["sortable"] = false;
            }
            reHeader.push(headerSet)
        }
        return reHeader;
    }

    const initTableDataFormat = (dataSet) => {
        if(!dataSet.length > 0) return [];
        let reD = dataSet.map((value) => {
            return {
                ...value,
                actions: <CreateIcon onClick={event => {
                    // redirectTo('/dashboard/' + value.id + '/edit?key=' + (searchParams.get('key') ?? 'coa_master'))
                }} style={{cursor: "pointer", fontSize: 12}}/>
            }
        })
        return reD;
    }

    return <div id="app-data-table">
        <TableActions leftContent={
            <div>
                <span style={{marginRight: 10, fontWeight: 600}}>Total Data: {data.data.total}</span>
                {Object.keys(otherQuery).map((value, index) => {
                    return <span key={index} style={{
                        background: '#1876d2',
                        color: '#fff',
                        padding: '3px 4px 3px 4px',
                        borderRadius: '5px',
                        fontSize: '12px',
                        marginRight: '5px',
                        textTransform: 'capitalize'
                    }}>{capitalize(value.replace('filter_', ''))}: {otherQuery[value]}</span>
                })}
                {/* {Object.keys(otherQuery).length > 0 ? <span style={{fontWeight: 600, cursor: 'pointer'}}>Clear</span> : null} */}
            </div>
        } filterComponent={filterComponent} onCreate={event => {
            redirectTo('/' + location.pathname.split("/").pop() + '/create')
        }} moreActionButtons={moreActionButtons} onSearch={event => setSearchField(event)} />
        <DataTable
            paginationServer
            fixedHeader
            pagination
            sortServer
            paginationTotalRows={data.data.total}
            columns={data.header}
            data={initTableDataFormat(data.data.data)}
            paginationRowsPerPageOptions={[10, 20, 25, 30, 35, 40, 45, 50]}
            paginationPerPage={dataTableData.limit}
            defaultSortFieldId={defaultSortFieldId}
            onSort={(event, key) => {
                setTimeout(() => {
                    setDataTableData(p => ({
                        ...p,
                        sort: `${event.sortKeyValue},${key}`
                    }))
                }, 500)
            }}
            onChangeRowsPerPage={event => {
                setDataTableData( p => ({
                    ...p,
                    limit: event
                }));
            }}
            onChangePage={event => {
                setDataTableData( p => ({
                    ...p,
                    page: event
                }));
            }}
            
        />
    </div>
}
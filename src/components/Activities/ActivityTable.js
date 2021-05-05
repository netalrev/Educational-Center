import React, { Component } from "react";
import { useState, useEffect } from "react";
import { listApprovedActivitiess } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import RecipeReviewCard from "./RecipeReviewCard";

export default function ActivityTable() {
    const [allApprovedActivitiess, setAllApprovedActivitiess] = useState([]);

    useEffect(() => {
        fetchAllApprovedActivities();
    }, []);

    const fetchAllApprovedActivities = async () => {
        try {
            const approvedActivitiesData = await API.graphql(graphqlOperation(listApprovedActivitiess));
            const approvedActivitiesList = approvedActivitiesData.data.listApprovedActivitiess.items;
            setAllApprovedActivitiess(approvedActivitiesList);
        } catch (error) {
            console.log("error on fetching Approved Activities", error);
        }
    };

    function createRow(index) {
        var toReturn = [];
        for (var i = 0; i < 3; i++) {
            if (index + i >= allApprovedActivitiess.length) {
                break;
            }
            console.log(allApprovedActivitiess);
            toReturn.push(<td><RecipeReviewCard dates={allApprovedActivitiess[index + i].dates} activityCount={allApprovedActivitiess[index + i].activityCount} owner={allApprovedActivitiess[index + i].owner} title={allApprovedActivitiess[index + i].title} description={allApprovedActivitiess[index + i].description} /></td>)
        }
        return toReturn;
    }

    return (
        <tbody>
            {allApprovedActivitiess.map((activity, index) => {
                if (index % 3 === 0) {
                    return (
                        <tr>
                            {createRow(index)}
                        </tr>
                    )
                }
                else {
                    return ("");
                }
            })}
        </tbody>
    );
}


{/* <td>
                {allApprovedActivitiess.map((activity, index) => {
                    if (index % 3 === 0 && opentd === true) {
                        opentd = false;
                        return (
                            <tr>
                                <td>
                                    <RecipeReviewCard dates={activity.dates} activityCount={activity.activityCount} owner={activity.owner} title={activity.title} description={activity.description} />
                                </td>
                            </tr>
                        )
                    }
                })}
            </td> */}
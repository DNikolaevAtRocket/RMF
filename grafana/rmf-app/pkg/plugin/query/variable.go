/**
* (C) Copyright IBM Corp. 2023, 2024.
* (C) Copyright Rocket Software, Inc. 2023-2024.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
 */

package query

import (
	repo "github.com/IBM/RMF/grafana/rmf-app/pkg/plugin/repository"
	typ "github.com/IBM/RMF/grafana/rmf-app/pkg/plugin/types"
)

func GetVariable(query string, endpointModel *typ.DatasourceEndpointModel) ([]byte, error) {
	responseData, err := new(repo.Repository).ExecuteForVariableQuery(query, endpointModel)
	return responseData, err
}
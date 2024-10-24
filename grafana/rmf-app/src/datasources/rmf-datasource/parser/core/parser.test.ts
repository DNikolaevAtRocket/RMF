/**
 * (C) Copyright IBM Corp. 2023.
 * (C) Copyright Rocket Software, Inc. 2023.
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
import { Parser } from './parser';
import 'jest';

describe('Test ResourceType and Metrics', () => {

  test('Should return formated outcome', () => {
    const parser = new Parser('SYSPLEX.% CPU utilization (CP) by MVS image');
    expect(parser.parse().errorFound).toBeFalsy();
    expect(parser.parse().query).toBe('id=% CPU utilization (CP) by MVS image&resource=,,SYSPLEX');
  });

  test('Should return formated outcome', () => {
    const parser = new Parser('CPC.% CPU utilization (CP) by MVS image');
    expect(parser.parse().errorFound).toBeFalsy();
    expect(parser.parse().query).toBe('id=% CPU utilization (CP) by MVS image&resource=,,CPC');
  });

  test('Should retuen mismatched Resource type parameter', () => {
    const parser = new Parser('TEST1.% CPU utilization (CP) by MVS image');
    expect(parser.parse().errorFound).toBeTruthy();
    expect(parser.parse().errorMessage).toContain("line 1, col 0: mismatched input 'TEST1' expecting {RES_TYPE, WS}");
  });

  test('Should check if mismatched Resource type missing.', () => {
    const parser = new Parser('.');
    expect(parser.parse().errorFound).toBeTruthy();
    expect(parser.parse().errorMessage).toContain("line 1, col 0: mismatched input '.' expecting {RES_TYPE, WS}");
  });

  test('Should check if a resource type is missing.', () => {
    const parser = new Parser('.% CPU utilization (CP) by MVS image');
    expect(parser.parse().errorFound).toBeTruthy();
    expect(parser.parse().errorMessage).toContain("line 1, col 0: mismatched input '.' expecting {RES_TYPE, WS}");
  });

  test('Should check if a resource type syntex is wrong.', () => {
    const parser = new Parser('@.% CPU utilization (CP) by MVS image');
    expect(parser.parse().errorFound).toBeTruthy();
    expect(parser.parse().errorMessage).toContain("line 1, col 0: mismatched input '@' expecting {RES_TYPE, WS}");
  });

  test('Should check if a resource type & metrics syntex is wrong.', () => {
    const parser = new Parser('@.@');
    expect(parser.parse().errorFound).toBeTruthy();
    expect(parser.parse().errorMessage).toContain(
      "line 1, col 0: mismatched input '@' expecting {RES_TYPE, WS}"
    );
  });

  test('Should check if a metric is missing.', () => {
    const parser = new Parser('SYSPLEX.');
    expect(parser.parse().errorFound).toBeTruthy();
    expect(parser.parse().errorMessage).toContain("line 1, col 8: no viable alternative at input '.'");
  });

  test('Should check if a dot is missing.', () => {
    const parser = new Parser('SYSPLEX,% CPU utilization (CP) by MVS image');
    expect(parser.parse().errorFound).toBeTruthy();
    expect(parser.parse().errorMessage).toContain("line 1, col 7: mismatched input ',' expecting '.'");
  });
});

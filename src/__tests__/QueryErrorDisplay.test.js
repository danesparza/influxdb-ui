import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

//  Components under test
import QueryErrorDisplay from '../components/QueryErrorDisplay';

it('Displays no error as expected', () => {
    const tree = renderer.create(
        <QueryErrorDisplay />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('Displays the given error information', () => {
    const tree = renderer.create(
        <QueryErrorDisplay haserror='true' error="Some error text" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});


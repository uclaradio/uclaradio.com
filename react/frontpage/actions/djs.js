// djs.js
// action creators for actions related to frontpage djs

export const updateDJs = (djs) => ({
	type: 'UPDATE_DJS',
	djs: djs
});

export const startFetching = () => ({
	type: 'STARTED_FETCHING'
});

export const stopFetching = () => ({
	type: 'STOPPED_FETCHING'
});

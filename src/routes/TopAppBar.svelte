<script lang="ts">
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import IconButton from '@smui/icon-button';

	let prominent = false;
	let dense = false;
</script>

<TopAppBar variant="static" {prominent} {dense} color={'primary'}>
	<Row>
		<Section>
			<IconButton class="material-icons">menu</IconButton>
			<Title>My Dashboard</Title>
		</Section>
		<Section align="end" toolbar>
			<IconButton class="material-icons" aria-label="Download">edit</IconButton>
			<IconButton class="material-icons" aria-label="Print this page">add</IconButton>
			<IconButton class="material-icons" aria-label="Bookmark this page">settings</IconButton>
		</Section>
	</Row>
</TopAppBar>

<style>
	.top-app-bar-container {
		max-width: 480px;
		width: 100%;
		height: 320px;
		border: 1px solid var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
		margin: 0 18px 18px 0;
		background-color: var(--mdc-theme-background, #fff);

		overflow: auto;
		display: inline-block;
	}

	@media (max-width: 480px) {
		.top-app-bar-container {
			margin-right: 0;
		}
	}

	.flexy {
		display: flex;
		flex-wrap: wrap;
	}

	.flexor {
		display: inline-flex;
		flex-direction: column;
	}

	.flexor-content {
		flex-basis: 0;
		height: 0;
		flex-grow: 1;
		overflow: auto;
	}
</style>

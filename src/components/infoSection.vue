<template>

    <div>

        <b-container class="card">

        <b-row>

            <b-col><h4><i class="fas fa-file-contract"></i> Deine Vereinbarungen mit MedCastle</h4></b-col>

        </b-row>

        <div class="card-body">

        <b-row

            <p><b>Du bist der Eigentümer des Inhalts.</b> </p>
            <p>Mit dem Bereitstellen des Links gibst du den Inhalt zur Benutzung durch MedCastle frei. MedCastle teilt diese Inhalte nicht vorsätzlich mit Dritte.</p>
            <p>Der Inhalt darf durch MedCastle oder Dritte nicht verkauft werden.</p>
            <p>Der Inhalt darf Online gestellt werden: Damit lässt sich die Weiterverbreitung durch Dritte nicht ausschließen.</p>
            <p>Es gelten die MedCastle Datenschutzrichtlinie und die AGB.</p>

            <a href="#" class="card-link">Datenschutz</a>
            <a href="#" class="card-link">AGB</a>

        </b-row>

        </div>

        </b-container>
        
    </div>

</template>

<script>

export default {
    name: 'infoSection'
}

</script>

<style scoped>

h4 {
    float: left;
    margin-top: 40px;
    font-weight: bold;
}

p {
    text-align: left;
    font-style: italic;
}

a {
    float: left;
    text-align: left;
}

.card {
    margin: 20px auto;
}

</style>
class ListTaskUseCase {
    execute() {
        return null
    }

}

describe('Task Usecase List', () => {
    test('ListTaskUseCase returns null if no taskRepository is provided', () => {
        const sut = new ListTaskUseCase()
        expect(sut.execute()).toBeNull()

    })
})
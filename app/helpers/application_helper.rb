module ApplicationHelper
  def getErrors(object)
    object.errors.messages.merge(error: true)
  end
end
